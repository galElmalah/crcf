import cli from 'commander';
import { ComponentCreator } from './ComponentCreator';

//cli options
cli
  .option('-T, --ts', 'specify if the component should use typeScript')

// cli commands
cli
  .command('create <componentName>')
  .alias('c')
  .description('Create a component folder structure')
  .action((componentName) => {
    const componentCreator = new ComponentCreator(componentName, cli.ts, process.cwd());
    componentCreator.buildFolder();
  })

cli.parse(process.argv)
