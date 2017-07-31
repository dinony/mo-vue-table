export const fst = arr => arr[0]
export const snd = arr => arr[2]
export const lst = arr => arr[arr.length-1]

export const reduceObj = (obj, reducer, init) => {
  let accum = init
  for(const key in obj) {
    accum = reducer(accum, obj[key], key)
  }
  return accum
}

// TODO:
export const unzip = () => []
