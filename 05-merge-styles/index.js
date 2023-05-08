const fs = require('fs');
const path = require('path');

const { readdir, readFile, createWriteStream, appendFile } = fs;
const { extname } = path;

const createBundleCSS = () => {
  const sourceDir = path.join(__dirname, 'styles');
  const destFile = path.join(__dirname, 'project-dist', 'bundle.css');

  // Firstly we create an empty file (it also replaces the old one, if it was there)
  createWriteStream(destFile);

  // Secondly we find all files with extension .css in the source directory
  readdir(sourceDir, { withFileTypes: true }, (err, items) => {
    if (err) throw err;

    const filesCSS = items.filter((dirent) => dirent.isFile(dirent) && extname(dirent.name) === '.css');

    // Thirdly we read each file and bundle it one file
    filesCSS.forEach(({ name }) => {
      const fileCSSPath = path.join(sourceDir, name);

      readFile(fileCSSPath, 'utf-8', (err, styles) => {
        if (err) throw err;

        appendFile(destFile, styles, (err) => {
          if (err) throw err;
        });
      })
    })
  })
}

createBundleCSS();