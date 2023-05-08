const fs = require('fs');
const path = require('path');

const { stdin, exit } = process;
const stream = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdin.write(
`\nHi! You can write here text and it will be added to a new file.
To exit the terminal just type 'exit' or press 'Ctrl + C'\n\n`
);

stdin.on('data', (chunk) => {
  String(chunk).slice(0, 4) === 'exit' ? exit() : stream.write(chunk);
});

process.on('error', ({ message }) => console.log(`\nThere was an error:\n ${message}\n`));
process.on('SIGINT', () => exit());
process.on('exit', () => stdin.write('\nThe process is finished. Goodbye!\n'));
