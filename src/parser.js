import yaml from 'js-yaml';

// parse data for specified format
const parseData = (data, format) => {
  switch (format) {
    case 'yaml': return yaml.load(data) ?? {};
    case 'yml': return yaml.load(data) ?? {};
    case 'json': return JSON.parse(data);
    default: throw new Error(`"${format}" - is incorrect file of format`);
  }
};

export default parseData;
