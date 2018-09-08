import path from 'path';
import fs from 'fs';
import FileNamesGenerator from './FilesGenerator/FilesGenerator';

export interface File {
  fileName: string;
  content: string;
}

const capitalize = (text: string):string => text.replace(/^\w/, c => c.toUpperCase());


export class ComponentCreator {
  readonly currentPath: string;
  readonly componentName: string;
  readonly isTypeScript: boolean;

  constructor(componentName: string, isTypeScript: boolean, currentPath: string) {
    this.currentPath = currentPath;
    this.componentName = capitalize(componentName);
    this.isTypeScript = isTypeScript;
  }

  buildFolderPath = () => {
    return path.join(this.currentPath, this.componentName);
  }

  buildFolder = () => {
    try{ 
      fs.mkdirSync(this.buildFolderPath());
      const filesCreator = new FileNamesGenerator(this.componentName, this.isTypeScript);
      this.createFiles(filesCreator.createFilesTemplate());
    } catch(err) {
      console.log('Error while generating the component folder: ', err);
    }
  }

  createFiles = (files: File[]) => {
    files.forEach(file => {
      fs.writeFile(`${this.buildFolderPath()}/${file.fileName}`, file.content ,(err) => {
        if (err) {
          console.log(`Error creating ${file.fileName} :`, err);
        }
      })
    });
  }

}


