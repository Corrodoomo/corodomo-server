const fs = require('fs');
const readline = require('readline');

const inputFile = 'exams_bulk.json';
const outputFile = 'output_bulk.json';

const rl = readline.createInterface({
  input: fs.createReadStream(inputFile),
  crlfDelay: Infinity
});

const output = fs.createWriteStream(outputFile, { flags: 'w' });

rl.on('line', (line) => {
  if (!line.trim()) return;
  try {
    const doc = JSON.parse(line);
    const meta = {
      index: {
        _index: doc._index,
        _id: doc._id
      }
    };
    const source = doc._source;

    output.write(JSON.stringify(meta) + '\n');
    output.write(JSON.stringify(source) + '\n');
  } catch (err) {
    console.error('❌ Failed to parse line:', line);
    console.error(err.message);
  }
});

rl.on('close', () => {
  console.log('✅ Conversion completed. Output saved to', outputFile);
});
