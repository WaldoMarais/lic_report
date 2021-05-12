#!/usr/bin/env node

/**
 * Module dependencies
 */

// Public node modules.
const _ = require('lodash');

// commander.
const program = require('commander');

// Local dependencies.
const packageJSON = require('../package.json');

/* eslint-disable no-console */

/**
 * Normalize version argument
 *
 * `$ lic_report -v`
 * `$ lic_report -V`
 * `$ lic_report --version`
 * `$ lic_report version`
 */

program.allowUnknownOption(true);

// Expose version.
program.version(packageJSON.version, '-v, --version');

// Make `-v` option case-insensitive.
process.argv = _.map(process.argv, arg => {
  return (arg === '-V') ? '-v' : arg;
});

// `$ lic_report version` (--version synonym)
program
  .command('version')
  .description('output your version of License Reporter')
  .action(() => { console.log(packageJSON.version); });

// TODO: `$ lic_report plugins`
// program
//   .command('plugins')
//   .description('show available License Reporter plugins')
//   .action(require('./lic-plugins'));

// `$ lic_report run`
program
  .command('run [appPath]')
  .description('start your License Reporter application')
  .action((appPath) => {
    if(!appPath){
      appPath = process.cwd();
    }
    if(appPath && (appPath === '.' || appPath === ' ')){
      appPath = process.cwd();
    }
    console.log('[appPath] ', appPath);
    require('./lic-run')(appPath);
  });

// TODO: `$ lic_report config:github`
// program
//   .command('config:github <id> [attributes...]')
//   .option('-t, --tpl <template>', 'template name')
//   .option('-a, --api <api>', 'API name to generate a sub API')
//   .option('-p, --plugin <plugin>', 'plugin name to generate a sub API')
//   .description('generate a basic API')
//   .action((id, attributes, cliArguments) => {
//     cliArguments.attributes = attributes;
//     require('./lic-config')(id, cliArguments);
//   });

/**
 * Normalize help argument
 */

// `$ lic_report help` (--help synonym)
program
  .command('help')
  .description('output the help')
  .action(program.usageMinusWildcard);

// `$ lic_report <unrecognized_cmd>`
// Mask the '*' in `help`.
program
  .command('*')
  .action(program.usageMinusWildcard);

// Don't balk at unknown options.

/**
 * `$ lic_report`
 */
program.parse(process.argv);
const NO_COMMAND_SPECIFIED = program.args.length === 0;
if (NO_COMMAND_SPECIFIED) {
  program.usageMinusWildcard();
}
