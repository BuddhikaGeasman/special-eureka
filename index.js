#! /usr/bin/env node
'use strict';

const fs = require('fs');
const util = require('util');
const exec = require('child_process').exec;
const svgUtil = require('./util/utility');

/* svg folder */
const folder = './svgs/';

/* file to be written */
const writeFile = './icons.js';
const wstream = fs.createWriteStream(writeFile);

/* convert to path */
const fireXML = (folder, file) => {
  return `xmllint --xpath "string(//*[local-name()='path']/@d)" ${folder}${file} | tr -d ' '`;
};

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

/* read dir and write to file */
fs.readdir(folder, (err, files)=> {
  svgUtil.startMsg();
  files.forEach(
    file => exec(fireXML(folder, file), (err, stdout, stderr)=> {
      if (err) return svgUtil.errMsg(stderr);

      svgUtil.msg(file);
      wstream.write(`const ${variablify(file)} = '${stdout}'; \n\n`);
    })
  );
});
