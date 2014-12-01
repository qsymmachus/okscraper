var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var sleep = require('sleep');

var escraper = (function() {
  var loginUsername = process.env.OKC_USER;
  var password = process.env.OKC_PASS;

  return {
    // Appends 'essays' from a given okcupid user's profile to the file specified in 'outputPath'
    get: function(username, outputPath) {
      var usernameUrl = "http://" + loginUsername + ":" + password +  "@www.okcupid.com/login";

      // Login to okcupid
      request({
        url: "http://www.okcupid.com/login",
        method: "post",
        body: "p=&dest=&username=" + loginUsername + "&password=" + password,
        headers: { 'Content-type' : 'application/x-www-form-urlencoded'},
        rejectUnauthorized : false
      }, function (error, response, body) {
        if (error) {
          console.log("Aw snap, something broke:");
          console.log(error.toString());
        } else {
          console.log(response.status);
        }
      });
    }
  }
})();

escraper.get('quiscumque', '~/Desktop/essays.txt');