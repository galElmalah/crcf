import path from 'path';
import fs from 'fs';
import FileNamesGenerator from './FilesGenerator/FilesGenerator';
import chalk from 'chalk';

export interface File {
  fileName: string;
  content: string;
}

const error = chalk.bold.red;

export class ComponentCreator {
  constructor(private componentName: string, private isTypeScript: boolean, private currentPath: string) {
    this.currentPath = currentPath;
    this.componentName = componentName;
    this.isTypeScript = isTypeScript;
  }

  private buildFolderPath = () => {
    return path.join(this.currentPath, this.componentName);
  }

  buildFolder = () => {
    fs.mkdirSync(this.buildFolderPath());
    const filesCreator = new FileNamesGenerator(this.componentName, this.isTypeScript);
    this.createFiles(filesCreator.createFilesTemplate());
  }

  private createFiles = (files: File[]) => {
    files.forEach(file => {
      fs.writeFile(`${this.buildFolderPath()}/${file.fileName}`, file.content ,(err) => {
        if (err) {
          console.log(`Error creating ${file.fileName} :`, err);
        }
      })
    });
  }

}


