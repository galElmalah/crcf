import { File } from './ComponentCreator';

const filesGenerator = (fileName: string, isTs:boolean): File[] => {
  const fileEndings = isTs ? ['.driver.tsx', '.tsx', '.spec.ts']  : ['.driver.js', '.js', '.spec.js'];
  const indexFile = `index.${isTypeScript(isTs)}`;
  const fileNames = fileEndings.map(ending => fileName.concat(ending)).concat(indexFile);
  return fileNames.map((fileNameWithEnding, index) => ({ fileName:fileNameWithEnding, content: chooseFunction(index)(fileName, isTs) }));

}

const chooseFunction = (index: number) => {
  switch (index){
    case 0 : return driverFileContent;
    case 1 : return componentFileContent;
    case 2 : return specFileContent;
    case 3 : return indexFileContent;
    default: return (a:string, b:boolean) => a + b;
  }
};

const isTypeScript = (is: boolean): string => is ? 'tsx' : 'js';

const specFileContent = (fileName: string, isTs: boolean) => {
  return `
    import ${fileName}Driver from './${fileName}.driver.${isTypeScript(isTs)}';
  `
}

const driverFileContent = (fileName: string, isTs: boolean) => {
  return `
    import ${fileName} from './${fileName}';
    
    export default class ${fileName}Driver{
    }    
  `
}

const componentFileContent = (fileName: string, isTs: boolean) => {
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

const indexFileContent = (fileName: string, isTs: boolean) => {
  return `
    export {default} from './${fileName}.${isTypeScript(isTs)}'
  `
}

export default filesGenerator;