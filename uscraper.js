var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var sleep = require('sleep');
var log = require('single-line-log').stdout;

var uscraper = {
  // Appends 'num' usernames to the file specified in 'outputPath'.
  get: function(num, outputPath) {
    var matchesUrl = "https://www.okcupid.com/match?filter1=0,48&filter2=2,18,99&filter3=1,1&locid=0&timekey=1&fromWhoOnline=0&mygender=&update_prefs=1&sort_type=0&sa=1&count=" + num.toString();

    request(matchesUrl, function(error, response, html) {
      if (error) {
        console.log("Aw snap, something broke:");
        console.log(error.toString());
      } else {
        // Cheerio lets us parse the DOM with jQuery-like syntax
        var $ = cheerio.load(html);

        // Append each username to file specified in outputPath
        var count = 0;
        $('.username').each(function(index) {
          count += 1;
          username = $(this).text() + '\n';
          fs.appendFile(outputPath, username, function(err) { 
            if(err) { console.log(err); }
            log("APPENDING USERNAME " + username);
          });
        })
      }
    })
  },

  // Appends 100 usernames to file specified in 'outputPath' 'num' times
  batch: function(num, outputPath) {
    for (var i = 1; i <= num; i++) {
      console.log("Pausing before request number " + i.toString() + "...");
      sleep.sleep(2);
      this.get(100, outputPath);
      console.log("SCRAPED " + (i * 100).toString() + " USERNAMES")
    }
    console.log("---")
  }
}

//======================
module.exports = uscraper
uscraper.batch(process.argv[2], process.argv[3]);