import { File } from '../ComponentCreator';
import {stringToString, contentMapper, getFileEndings} from './utils'

export default class FileNamesGenerator {
  constructor(private fileName: string, private isTs:boolean) {};

  createFilesTemplate = (): File[] => {
    const {isTs, fileName} = this;
    const fileEndings = getFileEndings(isTs);
    const fileNames = this.buildCompleteFileNames(fileEndings);
    const keyToContent = contentMapper(fileName)
    return Object.keys(fileNames).map(key => {
      return {
        fileName: fileNames[key],
        content: keyToContent[key]
      }
    })
  }

  private buildCompleteFileNames = (fileEndings: stringToString) => {
    const fileNames: stringToString = {}
    Object.keys(fileEndings).map(key => {
      fileNames[key] = key === 'index' ? 'index'.concat(fileEndings[key]) : this.fileName.concat(fileEndings[key]);
    })
    return fileNames;
  }

}




