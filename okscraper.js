var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var sleep = require('sleep');
var log = require('single-line-log').stdout;
var escraper = require('./escraper');
var async = require('async');

var okscraper = (function() {
  function sanitize(essay) {
    return essay.replace(/^\s+|\s+$/g, "");
  }

  return {
    // Scrapes the essays from all OkCupid usernames found in 'userList'
    // userList should be a list of newline-separated usernames.
    scrape: function(userlist, outputPath) {
      fs.readFile(userlist, function(error, data) {
        if (error) throw error;
        usernames = data.toString().split('\n');
        for (index in usernames) {
          username = sanitize(usernames[index])
          sleep.sleep(1);
          escraper.get(username, outputPath);
          log("SCRAPED USER " + (index).toString() + ": " + username);
          sleep.sleep(1);
        }
      })
    }
  }
})();

//======================
module.exports = okscraper
okscraper.scrape(process.argv[2], process.argv[3]);