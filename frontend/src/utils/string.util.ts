const cParseInt = (str: string | null | undefined, radix: number) : number | null => str ? parseInt(str, radix) : null;

const formatRating = (item: number) => {
  return (Number.isInteger(item) ? `${item}.0` : item)
}

const stringUtils = { cParseInt, formatRating };
export default stringUtils;