const color = require('colors-cli');

/* start up message */
const startMsg = () =>console.log(
  color.x206('converting to paths.....')
);

/* succeed message */
const successMsg = file => console.log(
  color.x112(`converting path for ${file}`)
);

/* error message */
const errMsg = err => console.log(color.x160(err));

/* naming the constants */
const capitalize = word => {
  const letters = word.split('');
  const [firstLetter, ...restLetters] = letters;
  return [firstLetter.toUpperCase(), ...restLetters].join('');
};

const variablify = filename => {
  const [filenameWithoutExt, extension] = filename.split('.');
  const [first, ...rest] = filenameWithoutExt.split('-');
  const capitalized = rest.map(capitalize);
  return [first, ...capitalized].join('');
};

module.exports = {
  startMsg: startMsg,
  msg: successMsg,
  errMsg: errMsg,
  variablify: variablify,
};
