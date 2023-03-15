import toPlain from './plain.js';
import toStylish from './stylish.js';

export default (difference, format) => {
  switch (format) {
    case 'json': return JSON.stringify(difference);
    case 'plain': return toPlain(difference);
    default: return toStylish(difference);
  }
};
