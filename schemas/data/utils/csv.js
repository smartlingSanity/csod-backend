const csv = require('csv');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const parseCsv = promisify(csv.parse);

async function getListFromCsvFile(csvFile) {
  const csvFilePath = path.resolve(csvFile);
  const csvStringContent = await readFile(csvFilePath, {
    encoding: 'utf8',
  });
  return parseCsv(csvStringContent, {
    delimiter: ',',
    columns: true,
  });
}

module.exports = { getListFromCsvFile };
