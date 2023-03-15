import _ from 'lodash';

const findDifference = (firstObj, secondObj) => {
  // join keys from both objects & sort them alphabetically
  const joinedKeys = _.union(_.keys(firstObj), _.keys(secondObj));
  const keys = _.sortBy(joinedKeys, (item) => item.toLowerCase());

  // process keys in array
  const result = keys.map((key) => {
    // keys missing in the second object are considered 'deleted'
    if (!_.has(secondObj, key)) {
      return { key, value: firstObj[key], status: 'deleted' };
    }

    // keys missing in the first object are considered 'added'
    if (!_.has(firstObj, key)) {
      return { key, value: secondObj[key], status: 'added' };
    }

    // keys with same values considered 'unchanged'
    if (firstObj[key] === secondObj[key]) {
      return { key, value: firstObj[key], status: 'unchanged' };
    }

    // return 'changed' if some of values is Not Plain
    if (!_.isPlainObject(firstObj[key]) || !_.isPlainObject(secondObj[key])) {
      return {
        key,
        oldValue: firstObj[key],
        newValue: secondObj[key],
        status: 'changed',
      };
    }

    // call recursion for nested objects
    return {
      key,
      status: 'hasChildren',
      children: findDifference(firstObj[key], secondObj[key]),
    };
  });

  // return processed array
  return result;
};

export default findDifference;
