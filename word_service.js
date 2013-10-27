var express = require('express');
var fs = require('fs');
var readline = require('readline');

var rd = readline.createInterface({
  input: fs.createReadStream('./frequent_words.txt'),
  output: process.stdout,
  terminal: false
});

rd.on('line', function (line) {
  processLine(line);
});

rd.on('close', function () {
  startServing();
});

var wordFrequency = {};
var wordList = [];

var processLine = function (line) {
  var parts = line.split('\t');
  var word = parts[0].toLowerCase();
  var count = parts[1];
  wordFrequency[word] = count;
  wordList.push(word);
  if (word.indexOf(' ') != -1) {
    for (var i = 0; i < 2; ++i) {
      wordList.push(word);
    }
  }
}

var startServing = function () {
  var app = express();
  app.get('/randomWords/:count', function (req, res) {
    console.log('Serving a randomWords request from ' + req.connection.remoteAddress);
    var count = req.param('count');
    var words = {};
    var found = 0;
    while (found < count) {
      var wordIndex = ~~(Math.random() * wordList.length);
      var currentWord = wordList[wordIndex];
      if (words.hasOwnProperty(currentWord)) {
        continue;
      }
      words[currentWord] = true;
      ++found;
    }
    res.json(Object.keys(words));
    console.log(Object.keys(words));
  });

  app.get('/wordFrequency/:word', function (req, res) {
    var word = req.param('word');
    var res = 1;
    if (wordFrequency.hasOwnProperty(word)) {
      res = wordFrequency[word];
    }
    res.json(word);
  });

  app.listen(3002, function () {
    console.log('Listening...');
  });
}
