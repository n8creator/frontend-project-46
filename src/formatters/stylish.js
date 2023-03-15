import { isPrimal } from '../utils.js';

const getSpace = (depth, extraSpace) => {
  const space = 4;
  return ' '.repeat(extraSpace + depth * space);
};

const signs = {
  old: '-',
  added: '+',
  deleted: '-',
  unchanged: ' ',
  hasChildren: ' ',
};

const toString = (data, depth = 0) => {
  if (isPrimal(data)) {
    return String(data);
  }

  const getProps = (props, i) => Object.entries(props).map(([key, value]) => {
    const indent = getSpace(i, depth * 4);

    if (isPrimal(value) || value === null) {
      return `${indent}${key}: ${value}`;
    }

    return `${indent}${key}: {\n${getProps(value, i + 1)}\n${indent}}`;
  }).join('\n');

  const braceIndent = getSpace(depth, 4);
  return `{\n${getProps(data, 2)}\n${braceIndent}}`;
};

export default (difference) => {
  if (difference.length === 0) {
    return '{}';
  }

  const getStrings = (arr, depth) => arr.flatMap((prop) => {
    const keyIndent = getSpace(depth, 2);
    const braceIndent = getSpace(depth, 4);
    const defaultPrefix = `${keyIndent}${signs[prop.status]} ${prop.key}`;

    switch (prop.status) {
      case 'added': return `${defaultPrefix}: ${toString(prop.value, depth)}`;
      case 'deleted': return `${defaultPrefix}: ${toString(prop.value, depth)}`;
      case 'unchanged': return `${defaultPrefix}: ${toString(prop.value, depth)}`;
      case 'changed': return [
        `${keyIndent}${signs.old} ${prop.key}: ${toString(prop.oldValue, depth)}`,
        `${keyIndent}${signs.added} ${prop.key}: ${toString(prop.newValue, depth)}`,
      ];
      case 'hasChildren': {
        const children = getStrings(prop.children, depth + 1);
        return `${defaultPrefix}: {\n${children}\n${braceIndent}}`;
      }
      default: throw new Error(`Stylish formatter has gotten wrong status: "${prop.status}"`);
    }
  }).join('\n');

  return `{\n${getStrings(difference, 0)}\n}`;
};
