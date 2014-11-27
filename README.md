OkCupid Scraper
===============

Some handy tools for scraping OkCupid, written with Node.

Install the dependencies first:

```shell
$ npm install
```

##uscraper

Scrapes OkCupid usernames and dumps them in a file. 

```javascript
var uscraper = require('./uscraper')

// Scrapes 'n' usernames and appends them to a file.
uscraper.get(10, ~/docs/ten_usernames.txt)

// Scrapes 100 usernames 'n' times and appends them to a file.
uscraper.batch(5, ~/docs/five_hundred_usernames.txt)
```

You can also run uscraper directly from the shell. By default this will run `batch` with the arguments you pass.

```shell
$ node uscraper.js 5 ~/docs/five_hundred_usernames.txt
```
