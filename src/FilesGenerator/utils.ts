export type stringToString = {
  [key: string]: string;
};

type fileTypes = 'driver'|'component'|'spec'|'index'


export const contentMapper = (fileName: string): stringToString => ({
  'driver': driverFileContent(fileName),
  'component': componentFileContent(fileName),
  'spec': specFileContent(fileName),
  'index': indexFileContent(fileName)
})

export const getFileEndings = (isTs: boolean) => ({
  'driver': alternate(isTs, '.driver.tsx', '.driver.js'),
  'component': alternate(isTs, '.tsx', '.js'),
  'spec': alternate(isTs, '.spec.ts', '.spec.js'),
  'index': alternate(isTs, '.ts', '.js')
})

const alternate = (firstOrSecond: boolean, firstOption: any, secondOption: any) => {
  return firstOrSecond ? firstOption : secondOption;
}

const isTypeScript = (is: boolean): string => is ? 'tsx' : 'js';


const specFileContent = (fileName: string): string => {
  return `import ${fileName}Driver from './${fileName}.driver';`
}

const driverFileContent = (fileName: string): string => {
  return `import ${fileName} from './${fileName}';

export default class ${fileName}Driver{
}    
  `
}

const componentFileContent = (fileName: string): string => {
  return `
import * as 'React' from 'react';

export default class ${fileName}{
  constructor(props) {
  }

  render() {
    return (
      <div></div>
    )
  }
}
`
}

const indexFileContent = (fileName: string): string => {
  return `export {default} from './${fileName}';`
}

