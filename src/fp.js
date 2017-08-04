export const fst = arr => arr[0]
export const snd = arr => arr[1]
export const lst = arr => arr[arr.length-1]

export const reduceObj = (obj, reducer, init) => {
  let accum = init
  for(const key in obj) {
    accum = reducer(accum, obj[key], key)
  }
  return accum
}

export const unzip = zipped => {
  if(zipped.length >= 1) {
    const unzipped = []
    const lenghts = zipped.map(z => z.length)
    const max = lenghts.sort((x,y) => x > y ? -1 : 1)[0]

    for(let i = 0; i < max; i++) {
      unzipped[i] = []
      for(let j = 0; j < zipped.length; j++) {
        unzipped[i].push(zipped[j][i])
      }
    }

    return unzipped
  } else {
    return []
  }
}
