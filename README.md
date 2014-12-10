OkCupid Scraper
===============

Some handy tools for scraping OkCupid, written with Node.

Install the dependencies first:

```shell
$ npm install
```

##uscraper

Given a few count parameters, scrapes OkCupid usernames and dumps them in a file. 

```javascript
var uscraper = require('./uscraper')

// Scrapes 10 usernames and appends them to a file.
uscraper.get(10, '~/docs/ten_usernames.txt')

// Scrapes 100 usernames 5 times and appends them to a file.
uscraper.batch(100, 5, '~/docs/five_hundred_usernames.txt')
```

You can also run uscraper directly from the shell. By default this will run `batch` with the arguments you pass.

```shell
$ node uscraper.js 100 5 ~/docs/five_hundred_usernames.txt
```
##escraper

Given a username, scrapes OkCupid profile essays and dumps them in a file.

OkCupid requires authentication to access a profile, so you must provide a valid username and password stored in the environment variables `OKC_USER` and `OKC_PASS` respectively. escraper will use these credentials to authenticate its requests.

```javascript
var escraper = require('./escraper')

// Scrapes essays from someUsername's profile and appends them to a file.
escraper.get(someUsername, '~/docs/someUsernames_essays.txt')
```

You can also run escraper directly from the shell. By default this will run `get` with the arguments you pass.

```shell
$ OKC_USER=yourUsername OKC_PASS=yourPassword node escraper.js someUsername ~/docs/someUsernames_essays.txt
```
