import path from 'path';
import fs from 'fs';
import FileNamesGenerator from './FilesGenerator/FilesGenerator';
import chalk from 'chalk';

export interface File {
  fileName: string;
  content: string;
}


const errorFormat = chalk.bold.red;
const fileErrorHandler = ({error, file}: {error: any, file: File}): void => {
  const message = `${errorFormat(`Error while creating the file ${file.fileName}`)}
  ${error}`
  console.log(message);
}
export class ComponentCreator {
  constructor(private componentName: string, private isTypeScript: boolean, private currentPath: string) {}

  private buildFolderPath = () => {
    return path.join(this.currentPath, this.componentName);
  }

  buildFolder = async () => {
    fs.mkdirSync(this.buildFolderPath());
    const filesCreator = new FileNamesGenerator(this.componentName, this.isTypeScript);
    try{
      await this.createFiles(filesCreator.createFilesTemplate());
    } catch(err) {
      fileErrorHandler(err);
    }
  }

  private createFiles = (files: File[]) => {
    return Promise.all(files.map(this.fileWriterPromise))
  }

  private fileWriterPromise = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.writeFile(`${this.buildFolderPath()}/${file.fileName}`, file.content ,(err) => {
        if (err) reject({error: err, file});
        resolve(file.fileName);
      })
    });
  }

};




