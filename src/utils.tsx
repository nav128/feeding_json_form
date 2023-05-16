


export const validateAllFull = (x: string| string[]| Record<string, any>) => {
    if(typeof x === 'string') {
      return Boolean(x && x.trim())
    };
    if (Object(x).length === 0) return false;
    if (Array.isArray(x)) {
      return x.every((value) => validateAllFull(value));
    }
    
    return Object.values(x).every((value) => validateAllFull(value));
  };
  