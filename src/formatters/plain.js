import { isPrimal } from '../utils.js';

const formatValue = (value) => {
  if (isPrimal(value)) {
    return typeof value === 'string' ? `'${value}'` : value;
  }

  return '[complex value]';
};

export default (diff) => {
  const getStrings = (arr, path) => arr.flatMap((prop) => {
    const name = path.length > 0 ? `${path}.${prop.key}` : prop.key;

    switch (prop.status) {
      case 'added': return `Property '${name}' was added with value: ${formatValue(prop.value)}`;
      case 'deleted': return `Property '${name}' was removed`;
      case 'changed': return `Property '${name}' was updated. From ${formatValue(prop.oldValue)} to ${formatValue(prop.newValue)}`;
      case 'hasChildren': return getStrings(prop.children, name);
      case 'unchanged': return [];
      default: throw new Error(`Plain formatter has gotten wrong status: "${prop.status}"`);
    }
  });

  return getStrings(diff, '').join('\n');
};
