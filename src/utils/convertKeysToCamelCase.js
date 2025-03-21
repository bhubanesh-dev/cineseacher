const toCamelCase = str =>
  str
    .replace(/([A-Z]+)([A-Z][a-z])/g, (_, g1, g2) => g1.toLowerCase() + g2)
    .replace(/([-_ ]\w)/g, match => match[1].toUpperCase());

export const convertKeysToCamelCase = obj => {
  if (Array.isArray(obj)) {
    return obj.map(item => convertKeysToCamelCase(item));
  } else if (typeof obj === "object" && obj !== null) {
    return Object.keys(obj).reduce((acc, key) => {
      const camelKey = key.charAt(0).toLowerCase() + toCamelCase(key.slice(1));
      acc[camelKey] = convertKeysToCamelCase(obj[key]);

      return acc;
    }, {});
  }

  return obj;
};
