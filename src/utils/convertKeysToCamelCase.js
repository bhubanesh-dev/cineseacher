const toCamelCase = str =>
  str
    .replace(/([A-Z]+)([A-Z][a-z])/g, (_, g1, g2) => g1.toLowerCase() + g2)
    .replace(/([-_ ]\w)/g, match => match[1].toUpperCase());

export const convertKeysToCamelCase = data => {
  if (Array.isArray(data)) {
    return data.map(item => convertKeysToCamelCase(item));
  } else if (typeof data === "object" && data !== null) {
    return Object.keys(data).reduce((acc, key) => {
      const camelKey = key.charAt(0).toLowerCase() + toCamelCase(key.slice(1));
      acc[camelKey] = convertKeysToCamelCase(data[key]);

      return acc;
    }, {});
  }

  return data;
};
