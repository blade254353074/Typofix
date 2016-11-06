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

scrapy.scrape(
  'https://github.com/search?q=%E7%99%BB%E9%99%86&type=Repositories&utf8=%E2%9C%93',
  '.public.source > .d-inline-block a',
  function (err, data) {
    if (err) return console.error(err)
    console.log(data)
  }
)

function getUrl (q, page) {
  return url.format({
    protocol: 'https:',
    slashes: true,
    host: 'github.com',
    pathname: '/search',
    query: {
      q: encodeURIComponent(q),
      page: encodeURIComponent(page),
      type: 'Repositories',
      utf8: encodeURIComponent('✓')
    }
  })
}

function searchCode (q, page) {
  const url = getUrl(q, page)

  return new Promise(function (resolve, reject) {
    return scrapy.scrape(
      'https://github.com/search?q=%E7%99%BB%E9%99%86&type=Repositories&utf8=%E2%9C%93',
      '.public.source > .d-inline-block a',
      function (err, data) {
        if (err) return console.error(err)
        console.log(data)
      }
    )
  })
}
