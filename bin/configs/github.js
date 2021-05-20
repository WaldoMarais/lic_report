/**
 * Module dependencies
 */

// Node.js core.
const path = require('path');
const fs = require('fs-extra');

const yaml = require('js-yaml')

/**
 * Generate Github Actions Config Files
 */
module.exports = function () {

  const workingDir = process.cwd();
  const templatePath = path.join(__dirname, '../template');

  console.log('[GitHub Action] Creating configs');

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

  console.log('[GitHub Action] Config Done');

}