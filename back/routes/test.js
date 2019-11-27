const axios = require('axios')
const cheerio = require('cheerio')
const delay = require('delay')
const Movie = require('../models/movies')

function replaceAll(str, search, replace) {
  return str.split(search).join(replace)
}

const get_delay = async() => {
  await delay(200)
}

const crawling = async() => {
  for (let i = 1; i < 190561; i++) {
    let movie = await Movie.find({ index: i })
    console.log(i)

    try {
      get_delay()
    } catch (e) {
      console.log(e)
    }
    const html = await axios.get(movie.posterUrl)
    const $ = cheerio.load(html.data);
    const imgSrc = $('#targetImage').attr('src')
    console.log(imgSrc)
  }
}

try {
  crawling()
} catch (e) {
  console.log(e)
}