#!/usr/bin/env node

/**
 * Setup Configurations
 */
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml')

if (process.env.npm_config_global === 'true' || JSON.parse(process.env.npm_config_argv).original.includes('global')) {
  console.log('Global installation...');
} else {

  const workingDir = process.cwd();
  const templatePath = path.join(workingDir, 'node_modules', 'lic_report', 'template');

  console.log('[GitHub Action] Running');

  // Create Github Actions Files
  const actionsPath = path.join(workingDir,'actions');
  if(!fs.existsSync(actionsPath)){
    fs.mkdirSync(actionsPath);
  }
  const actionsFile = path.join(actionsPath, 'lic_action.yml');
  if(!fs.existsSync(actionsFile)){
    fs.copyFileSync(path.join(templatePath, 'lic_action.yml'), actionsFile);
  }

  // Create Github Actions Main File Or append Config

  const mainActionsPath = path.join(workingDir, '.github', 'workflows');
  if(!fs.existsSync(mainActionsPath)){
    fs.mkdirSync(mainActionsPath, {recursive: true});
  }
  const mainActionsFile = path.join(mainActionsPath, 'main.yml');
  if(!fs.existsSync(mainActionsFile)){
    fs.copyFileSync(path.join(templatePath, 'main.yml'), mainActionsFile);
  } else {
    // Check file and add config
    let fileContents = fs.readFileSync(mainActionsFile, 'utf8');
    if(fileContents && fileContents.length > 0){
      let ymlData = yaml.load(fileContents);
      if(ymlData){
        if(ymlData.jobs && ymlData.jobs.lic_report){
          console.log('\t- Main lic_report job found');
        } else {
          if(!!!ymlData.jobs){
            ymlData.jobs = {};
          }
          ymlData.jobs.lic_report =  {
            'runs-on': 'ubuntu-latest',
            name: 'Job to check Licenses',
            steps: [{
              name: 'Licenses Report Action Step',
              id: 'lic_report',
              uses: '<Project Github URL></Project>'
            }]
          };

          let yamlStr = yaml.dump(ymlData);
          fs.writeFileSync(mainActionsFile, yamlStr, 'utf8');
        }
      }
      //console.log(ymlData);
    }
  }

  console.log('[GitHub Action] Done');

  // Add Config template
  const configFile = path.join(workingDir, '.lic_config');
  if(!fs.existsSync(configFile)){
    fs.copyFileSync(path.join(templatePath, '.lic_config'), configFile);
  }
  console.log('[Lic Config] Done');
}

console.log('Installation done.');
