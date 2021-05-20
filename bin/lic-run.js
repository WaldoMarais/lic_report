#!/usr/bin/env node

'use strict';

/**
 * Module dependencies
 */

// Node.js core.
var os = require('os');
var path = require('path');
var platform = os.platform();
const fs = require('fs-extra');
const { exec, spawn } = require('child_process');

// Public
const shell = require('shelljs');

/**
 * `$ lic_report run`
 *
 * Run License Report
 */

 const run_script = (command, args, callback) => {
  console.log("Starting Process.");
  var child = spawn(command, args);

  var scriptOutput = "";

  // Piped directly
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);

  // child.stdout.setEncoding('utf8');
  // child.stdout.on('data', function(data) {
  //     console.log('stdout: ' + data);

  //     data=data.toString();
  //     scriptOutput+=data;
  // });

  // child.stderr.setEncoding('utf8');
  // child.stderr.on('data', function(data) {
  //     console.log('stderr: ' + data);

  //     data=data.toString();
  //     scriptOutput+=data;
  // });

  child.on('close', function(code) {
      callback(scriptOutput,code);
  });
}

const run_script_shell = (command, args, callback) => {
  let cmd = `${command} ${args.join(' ')}`;
  callback(shell.exec(cmd));
}

 const run = async (cmd, args) => {
  return await new Promise((res, rej) => {
    run_script_shell(`${cmd}`, args, (sout, code)=>{
      res(code);
    });
  });
}

module.exports = async function (appPath = '') {
  // Check Supported Platforms
  if (platform !== 'linux' && platform !== 'darwin' && platform !== 'win32') {
    console.error('Unsupported platform.');
    process.exit(1);
  }

  var arch = os.arch()
  if (platform === 'darwin' && arch !== 'x64') {
    console.error('Unsupported architecture.');
    process.exit(1);
  }

  // let exePath = path.join(__dirname, 'lic');
  if(!fs.existsSync(appPath)){
    appPath = path.join(process.cwd(), appPath);
  }

  // Make sure the container is not running
  try{
    await new Promise((res, rej) => {
      exec('docker rm lic_report', (/*err, stdout, stderr*/) => {
        res(true);
      });
    });
  } catch(err){
    // no need to log
  }
  
  console.log('[🚀 RUN] : ', appPath);

  let commandArgs = ['run', '--name', 'lic_report', '-v', `${appPath}:/scandir`, '-i', 'mantisware/lic_report'];
  switch(platform){
    case 'win32' :
      console.error('Still working on this platform ;)');
      break;
    case 'linux' :
        await run('docker', commandArgs, 'License Report...');
        break;
    case 'darwin' :
        await run('docker', commandArgs, 'License Report...');
      break;

    default:
      console.error('Oops, this is an unsupported platform ;)');
      break;
  }  
};