const path = require('path');
const glob = require('glob');
const fs = require('fs');
const uglifyjs = require('uglify-js');

var files = glob.sync('./../js/**/*.js');

var files = files.map((file) => {
  return './' + file;
});

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

async function concatenateFiles(filePaths) {

  const filePath = `C:\\xampp\\htdocs\\myprojects\\search-auto\\search-auto-for-shopify\\local-dev\\flextread\\assets\\_ymm.js`;
  try {
    const fileContents = await Promise.all(filePaths.map(filePath => readFile(filePath)));
    const concatenatedContent = fileContents.join('\n');
    fs.writeFile(filePath, concatenatedContent, 'utf8', (error) => {
      if (error) {
        console.error('Error writing file:', error);
      } else {
       console.log('Files concatenated successfully!');
			// const originalCode = fs.readFileSync('./prod/bundled.js', 'utf8');

			// const minifiedCode = uglifyjs.minify(originalCode, { compress: true, mangle: true });

			// fs.writeFileSync(filePath, minifiedCode.code, 'utf8');

      }
    });
  } catch (error) {
    console.error('Error reading file:', error);
  }
}

concatenateFiles(files);