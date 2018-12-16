import { File } from '../Creators/Component/ComponentCreator';
import {stringToString, contentMapper, getFileEndings, changeFirstLetterToLower} from '../Creators/Component/utils'

export default class FileNamesGenerator {
  constructor(private fileName: string, private isTs:boolean) {};

  createFilesTemplate = (): File[] => {
    const {isTs, fileName} = this;
    const fileEndings = getFileEndings(isTs);
    const fileNames = this.buildCompleteFileNames(fileEndings);
    const keyToContent = contentMapper(fileName, isTs)
    return Object.keys(fileNames).map(key => {
      return {
        fileName: fileNames[key],
        content: keyToContent[key]
      }
    })
  }

  private buildCompleteFileNames = (fileEndings: stringToString) => {
    const fileNames: stringToString = {}
    Object.keys(fileEndings).forEach(key => {
      if (key === 'index') {
        fileNames[key] = 'index'.concat(fileEndings[key]);
        return;
      } else if (key === 'style') {
        fileNames[key] = changeFirstLetterToLower(this.fileName).concat(fileEndings[key]);
        return;
      }
      fileNames[key] = this.fileName.concat(fileEndings[key]);
    })
    return fileNames;
  }

}




