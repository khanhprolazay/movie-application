const cParseInt = (str: string | null | undefined, radix: number) : number | null => str ? parseInt(str, radix) : null;

const stringUtils = { cParseInt };
export default stringUtils;