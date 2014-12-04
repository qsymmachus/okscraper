var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var sleep = require('sleep');
var log = require('single-line-log').stdout;

var escraper = (function() {
  var loginUsername = process.env.OKC_USER;
  var password = process.env.OKC_PASS;

  function logError(error) {
    console.log("Aw snap, something broke:");
    console.log(error.toString());
  }

  function sanitize(essay) {
    return essay.replace(/^\s+/g, "");
  }

  function parseProfile(body, username, outputPath) {
    // Cheerio lets us parse the DOM with jQuery-like syntax
    var $ = cheerio.load(body);
    // Append each essay to file specified in outputPath
    $(".text .essay").each(function() {
      essay = sanitize($(this).text());
      fs.appendFile(outputPath, essay, function(error) { 
        if (error) { 
          logError(error); 
        }
        else { 
          log("APPENDING ESSAYS FOR USER: " + username); 
        }
      });
    });
  }

  return {
    // Appends essays from a given okcupid user's profile to the file specified in 'outputPath'
    get: function(username, outputPath) {
      // Store request cookies in jar for persistent authentication
      var cookieJar = request.jar();
      // Login to okcupid
      request({
        url: "https://www.okcupid.com/login",
        method: "post",
        form: { "username": loginUsername, "password": password },
        headers: { 'Content-type' : 'application/x-www-form-urlencoded'},
        jar: cookieJar,
        rejectUnauthorized : false
      }, function (error, response, body) {
        if (error) {
          logError(error);
        } else {
          // Get the user's profile
          request.get({
            url: "https://www.okcupid.com/profile/" + username,
            jar: cookieJar,
            rejectUnauthorized : false
          }, function(error, response, body) {
            if (error) {
              logError(error);
            } else {
              parseProfile(body, username, outputPath);
            }
          });
        }
      });
    }
  }
})();

//=======================
module.exports = escraper
escraper.get(process.argv[2], process.argv[3]);
