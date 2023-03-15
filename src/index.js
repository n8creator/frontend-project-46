import getDifference from './differ.js';
import { loadData } from './utils.js';
import getFormatted from './formatters/index.js';

export default (firstFile, secondFile, formatter = 'stylish') => {
  const firstFileData = loadData(firstFile);
  const secondFileData = loadData(secondFile);

  const difference = getDifference(firstFileData, secondFileData);
  return getFormatted(difference, formatter.format);
};
