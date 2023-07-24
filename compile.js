const path = require('path');
const fs = require('fs');
const solc = require('solc');

const musicPath = path.resolve(__dirname, 'contracts', 'Music.sol');
const source = fs.readFileSync(musicPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'Music.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  'Music.sol'
].Music;
