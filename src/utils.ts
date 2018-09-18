import chalk from 'chalk';

const error = chalk.bold.red;
const boldGreen = chalk.green.bold;
const path = chalk.blue.underline.bold


export const isValidInput = (componentName: string) => {
  const validationObject = {
    errorMessage: '',
    valid: true
  };
  if(componentName.trim().length === 0) {
    validationObject.errorMessage = 'Cannot create a component with no name :/';
    validationObject.valid = true;
  }
  return validationObject;

}

export const capitalize = (text: string): string => text.replace(/^\w/, c => c.toUpperCase());

export const showSuccessMessage = (componentName: string, createdAtPath: string, isTypeScript?: boolean) => {
  const message = `Hooray!!
Successfuly created component named ${boldGreen(componentName)}.
${ boldGreen(isTypeScript ? 'TypeScript' : 'JavaScript')} component was created at: ${path(createdAtPath)}
`
  console.log(message);
}

export const showErrorMessage = (componentName: string, createdAtPath: string) => {
  const message =`${error('Error while creating the component name.')}
there is probably a folder with the same name as ${chalk.green(componentName)}
at the location ${path(createdAtPath)}
  `;
  console.log(message);
}