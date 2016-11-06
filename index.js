const fs = require('fs-extra')
const url = require('url')
const GitHubApi = require('github')
const scrapy = require('node-scrapy')

const github = new GitHubApi({
  debug: true,
  protocol: 'https',
  host: 'api.github.com',
  headers: { 'user-agent': 'Typofix bot' },
  followRedirects: false,
  timeout: 20000
})

// github.search.code({
//   q: '登陆+repo:*'
// })
//   .then(res => {
//     console.log(res)
//   })

function getSearchUrl (q, page) {
  return url.format({
    protocol: 'https:',
    slashes: true,
    host: 'github.com',
    pathname: '/search',
    query: {
      q,
      ref: 'searchresults',
      p: page,
      type: 'Code',
      utf8: '✓',
    }
  })
}

function searchCode (q, page) {
  const url = getSearchUrl(q, page)
  // supported selectors - https://github.com/fb55/css-select
  const model = {
    repos: '.code-list-item > .title > a:first-child',
    count: '.menu-item.selected > .counter',
    page: '.pagination > .current',
    next: '.pagination > *:last-child'
  }
  const options = {
    requestOptions: {
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.59 Safari/537.36'
    }
  }

  return new Promise(function (resolve, reject) {
    console.log(url)
    scrapy.scrape(url, model, function (err, data) {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

searchCode('登陆', 1)
  .then(function (data) {
    console.log(data)
  })
  .catch(function (err) {
    console.error(err)
  })
