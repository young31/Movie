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


// let data = await Movie.find({})
// for (i = 14847; i < data.length; i++) {
//   const html = await axios.get(data[i].posterUrl)
//   const $ = cheerio.load(html.data);
//   const imgSrc = $('#targetImage').attr('src')
//   data[i].posterUrl = imgSrc
//   data[i].save()
//   console.log(data[i].index)
//     // await delay(200)
// }


const crawling = async() => {
  let data = await Movie.find({})
  for (i = 0; i < data.length; i++) {
    const html = await axios.get(data[i].posterUrl)
    const $ = cheerio.load(html.data);
    const imgSrc = $('#targetImage').attr('src')
    data[i].posterUrl = imgSrc
    data[i].save()
    console.log(i)
  }
}


try {
  crawling()
} catch (e) {
  console.log(e)
}