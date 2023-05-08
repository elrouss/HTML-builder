const fs = require('fs');
const path = require('path');

const { readdir, stat } = fs;
const { extname } = path;

const KILOBYTE = 1024;

readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, (err, items) => {
  if (err) throw err;

  const files = items.filter((dirent) => dirent.isFile(dirent));
  files
    .forEach((file) => {
      const { name } = file;
      const filePath = path.join(__dirname, 'secret-folder', name);

      stat(filePath, (err, item) => {
        if (err) throw err;

        console.log(`${name.slice(0, name.lastIndexOf('.'))} - ${extname(name).slice(1)} - ${(item.size / KILOBYTE).toFixed(3)}kb`)
      })
    })
})
