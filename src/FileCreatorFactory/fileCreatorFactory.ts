import { ComponentCreator } from '../ComponentCreator';


interface FileCreator {
  withTypeScript(): void;
  buildFolder():void;
}

interface Factory{
  getCreator(): FileCreator;
}

export const fileCreatorFactory = (type: string, path: string, name: string = 'index'): Factory => {
  return (
      {  
        getCreator: (): FileCreator => {
        switch(type){
          case 'component': return new ComponentCreator(name, path);
          case 'index': return {
            withTypeScript: () =>{},
            buildFolder: () =>{}
          };
        }
        throw new Error(`type ${type} is not defined`)
      }
    }
  )
}
