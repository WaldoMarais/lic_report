/**
 * PLUGINS
 */

// Node.js core.
const path = require('path');
const fs = require('fs-extra');
const shell = require('shelljs');

// Public node modules.
const _ = require('lodash');

module.exports = function () {
  // try {
  //   const globalRootPath = shell.exec('npm root -g', {silent: true});
  //   const plugins = fs.readdirSync(_.trim(globalRootPath.toString()), 'utf8');

  // REPORT PLUGINS
    
  //   logger.info(`Available Plugins:\n`);
  //   plugins.filter(pl => pl.indexOf('lic_report-plugin-') !== -1).forEach(plugin => {
  //     let plg = plugin.replace('lic_report-plugin-','');
  //     console.info(`- ${plg}`);
  //   });
  // } catch (e) {
  //   logger.error(e);
  // }
};
