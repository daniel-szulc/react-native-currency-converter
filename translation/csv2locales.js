const {saveAs} = require('file-saver')
const fs = require('fs')
const i18nGenerator = require('i18n-generator');
const inputFile  = 'input.csv';
const exportStatements = [];
i18nGenerator.get(inputFile, 'csv', (err, data) => {
  const languageKeys = Object.keys(data).filter(key => key !== 'default');
  languageKeys.forEach(key => {
    const fileName = `./resources/${key}.ts`;
    const exportStatement = `export { default as ${key} } from "./${key}.ts";`;
    exportStatements.push(exportStatement);
    fs.writeFile(fileName, `export default ${JSON.stringify(data[key])}`, (err) => {
      if (err) throw err;
    });
  });
  fs.writeFile('./resources/index.ts', exportStatements.join('\n'), (err) => {
    if (err) throw err;
  });
});
