#! /usr/bin/env node
'use strict';

const fs = require('fs');
const util = require('util');
const exec = require('child_process').exec;
const svgUtil = require('./util/utility');
const path = require('path');

/* commander */
const program = require('commander');
program
    .version('0.0.1')
    .option('-i, --input [dir]', 'Input Directory')
    .option('-o, --output [dir]', 'Output Directory')
    .option('-f, --file <file>', 'File Name')
    .parse(process.argv);

/* svg folder */
const folder = path.resolve(`${program.input}`);

/* file to be written */
const writeFile = path.resolve(`${program.file}`);
const wstream = fs.createWriteStream(writeFile);

/* convert to path */
const fireXML = (folder, file) => (
  `xmllint --xpath "string(//*[local-name()='path']/@d)" ${folder}/${file} | tr -d ' '`
);

/* read dir and write to file */
fs.readdir(folder, (err, files)=> {
  svgUtil.startMsg();
  files.forEach(
    file => exec(fireXML(folder, file), (err, stdout, stderr)=> {
      if (err) return svgUtil.errMsg(stderr);

      svgUtil.msg(file);
      wstream.write(`export const ${svgUtil.variablify(file)} = '${stdout}';
`);
    })
  );
});
