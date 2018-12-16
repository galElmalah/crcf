import { changeFirstLetterToLower, getFileEndings } from "./utils";

export const specFileContent = (fileName: string, isTs: boolean): string => {
  return `import ${fileName}Driver from './${fileName}.driver';
  
describe('initial test', () => {
  let driver${isTs ? `: ${fileName}Driver` : ""};

  beforeEach(() => {
    driver = new ${fileName}Driver();
  });

  test('fake', () => {
    expect(1).toBe(1);
  })
});
  `;
};

export const driverFileContent = (fileName: string): string => {
  return `import ${fileName} from './${fileName}';

export default class ${fileName}Driver{
}    
  `;
};

export const componentFileContent = (fileName: string): string => {
  return `import * as React from 'react';
import * as s from './${changeFirstLetterToLower(fileName)}${
    getFileEndings().style
  }';

export default class ${fileName} extends React.Component{
  constructor(props)  {
    super(props);
  }

  render() {
    return (
      <div></div>
    );
  }
}
`;
};

export const indexFileContent = (fileName: string): string => {
  return `export {default} from './${fileName}';`;
};

export const stylesheetFileContent = (): string => {
  return ``;
};
