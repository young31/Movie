const request = require('request')
const NAVER_CLIENT_ID = 'ToOYV34D47JhRtVyyF9j'
const NAVER_CLIENT_SECRET = '4kpmnrvLLC'
const option = {
  query: '일',
  display: 100,
  start: 1
}

request.get({
  uri: 'https://openapi.naver.com/v1/search/movie.json',
  qs: option,
  headers: {
    'X-Naver-Client-Id': NAVER_CLIENT_ID,
    'X-Naver-Client-Secret': NAVER_CLIENT_SECRET
  }
}, function(err, res, body) {
  let json = JSON.parse(body)
  console.log(json)
})