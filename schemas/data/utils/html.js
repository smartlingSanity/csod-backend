const _ = require('lodash/fp');

const getFirstTextThatMatches = (regex, text) => {
  const matches = text.match(regex);
  if (matches) {
    return matches[0];
  }
  return text;
};

const getHtmlAttribute = _.curry((attr, text) => {
  const regex = new RegExp(`(?<=${attr}=")(.*)(?=")`);
  return getFirstTextThatMatches(regex, text);
});

const getHtmlChildren = _.curry((tag, text) => {
  const regex = new RegExp(`(?<=<${tag}.+>)(.*?)(?=</${tag}>)`);
  return getFirstTextThatMatches(regex, text);
});

module.exports = {
  getFirstTextThatMatches,
  getHtmlAttribute,
  getHtmlChildren,
};
