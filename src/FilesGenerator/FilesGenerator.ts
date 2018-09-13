import { File } from '../ComponentCreator';
import {stringToString, contentMapper, getFileEndings, changeFirstLetterToLower} from './utils'

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
      if (key === 'index') {
        return 'index'.concat(fileEndings[key]);
      } else if (key === 'style') {
        return changeFirstLetterToLower(this.fileName).concat(fileEndings[key]);
      }
      return this.fileName.concat(fileEndings[key]);
    })
    return fileNames;
  }

}




