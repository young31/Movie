const axios = require('axios')
const cheerio = require('cheerio')
const delay = require('delay')

function replaceAll(str, search, replace) {
  return str.split(search).join(replace)
}

const get_delay = async () => {
  await delay(200)
}

const crawling = async () => {
  for ( let i = 139521; i < 190561; i++ ) {
  // for ( let i = 136873; i < 136874; i++ ) {
    console.log(i)
    try { get_delay()
    } catch (e) {
      console.log(e)
    }
    const html = await axios.get(`https://movie.naver.com/movie/bi/mi/basic.nhn?code=${i}`)
    const $ = cheerio.load(html.data);
    const $title = $("#content").children('div.article')
    const $score = $title.children('div.section_group.section_group_frst')
    const $staffs = $score.children('div:nth-child(2)').children('div').children('ul')
    const $description = $score.children('div:nth-child(1)').children('div').children('div')
    const $posterUrl = $title.children('div.mv_info_area')
    const $genre = $posterUrl.children('div.mv_info').children('dl').children('dd:nth-child(2)').children('p')
    const $openDt = $genre.children('span:nth-child(4)')
    const $runningTime = $genre.children('span:nth-child(3)')
    const $preview = $score.children('div:nth-child(4)').children('div').children('ul').children('li:nth-child(1)').children('a')

    title = $title.children('div.mv_info_area').children('div.mv_info').children('h3').children('a:nth-child(1)').text()
    score = $score.children('div:nth-child(5)').children('div:nth-child(2)').children('div.score_area').children('div.netizen_score').children('div').children('div').children('em').text()
    directors = []
    actors = []
    // console.log($staffs.children('li').length)

    for ( let i = 1; i <= $staffs.children('li').length; i++ ) {
      if ( $staffs.children(`li:nth-child(${i})`).children('dl').children('dt').text() === '감독' ) {
        const staff = {
          name: $staffs.children(`li:nth-child(${i})`).children('a.tx_people').text(),
          img: $staffs.children(`li:nth-child(${i})`).children('a.thumb_people').children('img').attr('src')
        }
        directors.push(staff)
      } else {
        const staff = {
          name: $staffs.children(`li:nth-child(${i})`).children('a.tx_people').text(),
          img: $staffs.children(`li:nth-child(${i})`).children('a.thumb_people').children('img').attr('src')
        }
        actors.push(staff)
      }
    }
    description = $description.children('p').text()
    // posterUrl = $posterUrl.children('div.poster').children('a').children('img').attr('src')
    posterUrl = `https://movie.naver.com/movie/bi/mi/photoViewPopup.nhn?movieCode=${i}`
    $genres = $genre.children('span:nth-child(1)')
    
    const genres = []
    for ( let i = 1; i <= $genres.children('a').length; i++ ) {
      genres.push($genres.children(`a:nth-child(${i})`).text())
    }
    runningTime = $runningTime.text()
    if ( title === '' ) {
      continue
    }
    preview = 'https:/' + $preview.attr('href')
    let openDt = ''
    for ( let i = 1; i <= $openDt.children('a').length; i++ ) {
      openDt = openDt + $openDt.children(`a:nth-child(${i})`).text()
    }
    // openDt = openDt.replace('.', '-')
    openDt = replaceAll(openDt, '.', '-').trim()
    // console.log(title)
    // console.log(score)
    // console.log(directors)
    // console.log(actors)
    // console.log(description)
    // console.log(posterUrl)
    // console.log(genres)
    // console.log(runningTime)
    // console.log(preview)

    // document.querySelector(" a:nth-child(1)")

    const movie_info = {
      index: i,
      title,
      openDt,
      score: parseFloat(score),
      directors,
      actors,
      description,
      posterUrl,
      genres,
      runningTime: parseInt(runningTime),
      preview
    }

    axios.post('http://localhost:3000/api/movies', movie_info)
      .then(response => {
        console.log(response)
      })
      .catch(error =>{
        console.error(error)
      })

    // if ( i === 190560 ) {
    //   console.log(titles)
    // }
  }
}

try { crawling()
} catch (e) {
  console.log(e)
}


// title: String,
// document.querySelector("#content > div.article > div.mv_info_area > div.mv_info > h3 > a:nth-child(1)")
// score: { type: Float },
// document.querySelector("#content > div.article > div.section_group.section_group_frst > div:nth-child(5) > div:nth-child(2) > div.score_area > div.netizen_score > div > div > em")
// actors: Array,
// directors: Array,
// img
// document.querySelector("#content > div.article > div.section_group.section_group_frst > div:nth-child(2) > div > ul > li:nth-child(1) > a.thumb_people > img")
// name
// document.querySelector("#content > div.article > div.section_group.section_group_frst > div:nth-child(2) > div > ul > li:nth-child(1) > a.tx_people")
// staff
// document.querySelector("#content > div.article > div.section_group.section_group_frst > div:nth-child(2) > div > ul > li:nth-child(1) > dl > dt")
// description: String,
// document.querySelector("#content > div.article > div.section_group.section_group_frst > div:nth-child(1) > div > div > h5")
// document.querySelector("#content > div.article > div.section_group.section_group_frst > div:nth-child(1) > div > div > p")
// posterUrl: String,
// document.querySelector("#content > div.article > div.mv_info_area > div.poster > a > img")
// genres: Array,
// document.querySelector("#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(2) > p > span:nth-child(1) > a:nth-child(1)")
// runningTime: Number
// document.querySelector("#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(2) > p > span:nth-child(3)")
// preview
// document.querySelector("#content > div.article > div.section_group.section_group_frst > div:nth-child(4) > div > ul > li:nth-child(1) > a")


// const crawling = async () => {
//   for ( let i = 9923; i < 190561; i++ ) {
//     console.log(i)
//     const html = await axios.get(`https://movie.naver.com/movie/bi/mi/basic.nhn?code=${i}`)
//     const $ = cheerio.load(html.data);
//     const $title = $("#content").children('div.article').children('div.mv_info_area').children('div.mv_info').children('h3').children('a')
//     title = $title.text()
//     if ( title !== '' ) {
//       titles.push(title)
//     }
//     // console.log(title)
//     if ( i === 190560 ) {
//       console.log(titles)
//     }
//   }
// }
// try { crawling() 
// } catch (e) {
//   console.log(e)
// }


// const getHtml = async () => {
//   for (let i = 32147; i < 32150; i++) {
//     try {
//       return await axios.get(`https://movie.naver.com/movie/bi/mi/basic.nhn?code=${i}`);
//     } catch (error) {
//       console.error(error)
//     }

//   getHtml()
//     .then(html => {
//       const $ = cheerio.load(html.data);
//       const $title = $("#content").children('div.article').children('div.mv_info_area').children('div.mv_info').children('h3').children('a')
//       title = $title.text()
//       // titles.push(title)
//       return title
//     })
//     .then(res => {
//       titles.push(res)
//       console.log(titles)
//     })
//   }
// }
// console.log(titles)