#!/usr/bin/env node

/**
 * CONFIG
 */

// Node.js core.
const fs = require('fs');
const path = require('path');

/**
 * `$ lic_report config`
 *
 * Configure a lic_report for your project.
 */

module.exports = async function (appPath) {

  const workingDir = process.cwd();
  const configFile = path.join(workingDir, '.lic_config');
  const templatePath = path.join(__dirname, '../template', '.lic_config');

  // console.log('Locations:');
  // console.log(`\t[workingDir]: ${workingDir}`);
  // console.log(`\t[template]: ${templatePath}`);
  
  // Add Config template  
  if(!fs.existsSync(configFile)){
    fs.copyFileSync(templatePath, configFile);
    console.log('[Config] Template added');
  } else {
    console.log('[Config] Template already exists, you can rename it and try again.');
  }

};
