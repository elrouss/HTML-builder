const fs = require('fs');
const path = require('path');

const { readdir, mkdir, copyFile, unlink } = fs;

const copyDir = () => {
  // Firstly we create the destination directory
  mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
    if (err) throw err;
  });

  const sourceDir = path.join(__dirname, 'files');
  const destDir = path.join(__dirname, 'files-copy');

  // Secondly we clear all files in the destination directory,
  // if it was created before and is not empty
  readdir(destDir, (err, files) => {
    if (err) throw err;

    for (let file of files) {
      const filePath = path.join(destDir, file);

      unlink(filePath, (err) => {
        if (err) throw err;
      })
    }

    // Thirdly we copy files from the source directory to the destination one
    readdir(sourceDir, (err, files) => {
      if (err) throw err;

      for (let file of files) {
        const sourceFile = path.join(sourceDir, file);
        const destFile = path.join(destDir, file);

        copyFile(sourceFile, destFile, (err) => {
          if (err) throw err;
        })
      }
    })
  })
}

copyDir();
