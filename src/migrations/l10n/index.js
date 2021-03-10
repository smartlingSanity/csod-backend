const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const { log } = console;

function* filesGenerator(files) {
  for (const file of files) {
    yield file;
  }
}

const isDirectory = entry => fs.lstatSync(entry).isDirectory();

function run() {
  try {
    const files = fs
      .readdirSync(__dirname, { encoding: 'utf-8' })
      .filter(
        f => !/^(index|utils|changeLocaleKeys)/.test(f)
          && !isDirectory(path.join(__dirname, f)),
      );
    const filesIterator = filesGenerator(files);
    const runCommand = (file) => {
      if (file.done) {
        return;
      }
      console.log(`run command ${file.value}`);
      const sanityExec = spawn('sanity', [
        'exec',
        '--with-user-token',
        path.join(__dirname, file.value),
      ]);
      sanityExec.stdout.setEncoding('utf-8');
      sanityExec.stdout.on('data', data => log(data));

      sanityExec.stderr.setEncoding('utf-8');
      sanityExec.stderr.on('data', data => log(data));

      sanityExec.on('exit', (code) => {
        if (code === 0) {
          log(`finished ${file.value}`);
          log('------------------------------------');
          log('');
          runCommand(filesIterator.next());
        }
      });
    };
    runCommand(filesIterator.next());
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

run();
