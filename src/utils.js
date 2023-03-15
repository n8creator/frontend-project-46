import _ from 'lodash';
import * as fs from 'fs';
import path from 'path';

import parseData from './parser.js';

// load data from some input file from filePath
const loadData = (fileName) => {
  const absolutePath = path.resolve(fileName);
  const format = path.extname(fileName).slice(1);
  return parseData(fs.readFileSync(absolutePath, 'utf-8'), format);
};

// check if ofject is not plain and is not array
const isPrimal = (data) => !_.isPlainObject(data) && !_.isArray(data);

export { loadData, isPrimal };
