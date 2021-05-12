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
const { exec } = require('child_process');

// Public
const {cyan} = require('chalk');
const ora = require('ora');
const shell = require('shelljs');

// Local dependencies.
const packageJSON = require('../package.json');

/**
 * `$ lic_report run`
 *
 * Run License Report
 */

 const run = async (cmd, msg) => {
  return await new Promise((res, rej) => {
    exec(`${cmd}`, (err, stdout, stderr) => {
      if (err) {
        console.error('[❌ RUN] ', err);
        rej(err);
      } else {
        if(msg){
          console.log(`[🚀 RUN] ${msg}`);
        }
        res(`${stdout} ${stderr}`);
      }
    });
  });
}

module.exports = async function (plugin, cliArguments) {
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

  let exePath = path.join(__dirname, 'lic');
  switch(platform){
    case 'win32' :
      console.error('Still working on this platform ;)');
      break;
    case 'linux' :
        await run(`./${exePath}`, 'License Report...');
        break;
    case 'darwin' :
        await run(`./${exePath}`, 'License Report...');
      break;

    default:
      console.error('Oops, this is an unsupported platform ;)');
      break;
  }  
};