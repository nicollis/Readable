
export function capitalize (str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}

export function sort(sortTarget) {
  return function(firstValue, sectionValue) {
    return firstValue[sortTarget] < sectionValue[sortTarget]
  }
}

export const uuid = require('uuid/v1')
