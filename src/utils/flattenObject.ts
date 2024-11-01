export function flattenObject(obj, parentKey = '', result = {}) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;

      if (typeof obj[key] === 'object' && obj[key] !== null) {
        // Recursively flatten the nested object
        flattenObject(obj[key], newKey, result);
      } else {
        // Assign the flattened key-value pair to the result
        result[newKey] = obj[key];
      }
    }
  }

  return result;
}
