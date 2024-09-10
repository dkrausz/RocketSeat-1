export const buildRoutePath=(path)=>{
    
    const routePrameterRegex = /:([a-zA-Z]+)/g;

    const pathWithParams = path.replaceAll(routePrameterRegex, '(?<$1>[a-z0-9\-_]+)');   
    
    const pathRegex = new RegExp(`^${pathWithParams}`);

       
    return pathRegex;

}