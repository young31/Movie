// const name = targetObject.sort(function(x, y) {
//   return x['aa'] - y['aa']
// })

const a = [{
    aa: 12,
    bb: 23
  },
  {
    aa: 23,
    bb: 34
  }
]

// a.forEach(function(a) {
//   if (a.aa === 12) {
//     a.aa = 56
//   }
// })

console.log(a.some(item => item.aa === 12))