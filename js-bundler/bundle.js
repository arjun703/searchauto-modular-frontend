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
  try {
    const fileContents = await Promise.all(filePaths.map(filePath => readFile(filePath)));
    const concatenatedContent = fileContents.join('\n');
    fs.writeFile('./prod/bundled.js', concatenatedContent, 'utf8', (error) => {
      if (error) {
        console.error('Error writing file:', error);
      } else {
       console.log('Files concatenated successfully!');
			const originalCode = fs.readFileSync('./prod/bundled.js', 'utf8');

			const minifiedCode = uglifyjs.minify(originalCode, { compress: true, mangle: true });

			fs.writeFileSync('./prod/bundled.js', minifiedCode.code, 'utf8');

			console.log('Code minified and obfuscated successfully!');
      }
    });
  } catch (error) {
    console.error('Error reading file:', error);
  }
}

concatenateFiles(files);