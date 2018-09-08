import path from 'path';
import fs from 'fs';
import FileNamesGenerator from './FilesGenerator/FilesGenerator';

export interface File {
  fileName: string;
  content: string;
}

const capitalize = (text: string):string => text.replace(/^\w/, c => c.toUpperCase());


export class ComponentCreator {
  constructor(private componentName: string, private isTypeScript: boolean, private currentPath: string) {
    this.currentPath = currentPath;
    this.componentName = capitalize(componentName);
    this.isTypeScript = isTypeScript;
  }

  private buildFolderPath = () => {
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


