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

module.exports = function (plugin, cliArguments) {
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

  switch(platform){
    case 'win32' :
      break;
    case 'linux' :
        break;
    case 'darwin' :
      break;

    default:
      console.error('Oops, this should not happen ;)');
      break;
  }  
};