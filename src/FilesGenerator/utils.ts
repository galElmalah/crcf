export type stringToString = {
  [key: string]: string;
};

type fileTypes = 'driver'|'component'|'spec'|'index'|'sass'

export const changeFirstLetterToLower = (text: string) => {
  let temp = text.split('');
  temp[0] = temp[0].toLowerCase();
  return temp.join('');
}

export const contentMapper = (fileName: string): stringToString => ({
  'driver': driverFileContent(fileName),
  'component': componentFileContent(fileName),
  'spec': specFileContent(fileName),
  'index': indexFileContent(fileName),
  'style': stylesheetFileContent()
})

export const getFileEndings = (isTs: boolean) => ({
  'driver': alternate(isTs, '.driver.tsx', '.driver.js'),
  'component': alternate(isTs, '.tsx', '.js'),
  'spec': alternate(isTs, '.spec.ts', '.spec.js'),
  'index': alternate(isTs, '.ts', '.js'),
  'style': '.scss'
})

const alternate = (firstOrSecond: boolean, firstOption: any, secondOption: any) => {
  return firstOrSecond ? firstOption : secondOption;
}

const specFileContent = (fileName: string): string => {
  return `import ${fileName}Driver from './${fileName}.driver';`
}

const driverFileContent = (fileName: string): string => {
  return `import ${fileName} from './${fileName}';

export default class ${fileName}Driver{
}    
  `;
}

const componentFileContent = (fileName: string): string => {
  return (
`import * as React from 'react';
import * as s from './${changeFirstLetterToLower(fileName)}${getFileEndings(true)['style']}';

export default class ${fileName} extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div></div>
    );
  }
}
`);
}

const indexFileContent = (fileName: string): string => {
  return `export {default} from './${fileName}';`;
}

const stylesheetFileContent = (): string => {
  return ``;
}

