#!/usr/bin/env node
import cli from 'commander';
import { ComponentCreator } from './ComponentCreator';
import {isValidInput, showErrorMessage, showSuccessMessage, capitalize} from './utils'

const tryToCreateBoilerplateForComponent = (componentName: string, currentPath: string, isTypeScript: boolean) => {
  const capitalizeName = capitalize(componentName);
  const componentCreator = new ComponentCreator(capitalizeName, isTypeScript, currentPath);
  try{
    componentCreator.buildFolder();
    showSuccessMessage(capitalizeName, currentPath)
  } catch(err) {
    showErrorMessage(capitalizeName, currentPath)
  }
}

//cli options
cli
  .option('-T, --ts', 'specify if the component should use typeScript')

// cli commands
cli
  .command('create <componentName>')
  .alias('c')
  .description('Create a component folder structure')
  .action((componentName) => {
    const validation = isValidInput(componentName);
    if(validation.valid) {
      tryToCreateBoilerplateForComponent(componentName, process.cwd(), cli.ts)
    } else {
      console.log(`validation ERROR => ${validation.errorMessage}`);
    }
  })

cli.parse(process.argv)
