import { driverFileContent, componentFileContent, specFileContent, indexFileContent, stylesheetFileContent } from "./content";

export type stringToString = {
  [key: string]: string;
};


export const changeFirstLetterToLower = (text: string) => {
  let temp = text.split('');
  temp[0] = temp[0].toLowerCase();
  return temp.join('');
}

export const contentMapper = (fileName: string, isTs: boolean): stringToString => ({
  'driver': driverFileContent(fileName),
  'component': componentFileContent(fileName),
  'spec': specFileContent(fileName, isTs),
  'index': indexFileContent(fileName),
  'style': stylesheetFileContent()
})

export const getFileEndings = (isTs: boolean = true) => ({
  'driver': alternate(isTs, '.driver.tsx', '.driver.js'),
  'component': alternate(isTs, '.tsx', '.js'),
  'spec': alternate(isTs, '.spec.ts', '.spec.js'),
  'index': alternate(isTs, '.ts', '.js'),
  'style': '.scss'
})

const alternate = (firstOrSecond: boolean, firstOption: any, secondOption: any) => {
  return firstOrSecond ? firstOption : secondOption;
}
