import { seeds } from '../output/seeds.js'
import fs from 'fs'
import { ethers } from 'ethers'

const countSeeds = () => {
  console.log('Length of seeds array: ', seeds.length)
  let seedsMap = {}
  seeds.forEach(seed => {
    if (seedsMap[seed]) {
      console.log('found duplicate: ', seedsMap[seed])
    } else {
      seedsMap[seed] = true;
    }
  })
  // This should be 1000, meaning we hit no dupes
  console.log(Object.keys(seedsMap).length)
  // Now concat the arrays into a single bytes32 value, and check uniqueness  
  let newUniqueValues = {}
  let newArray = []
  seeds.forEach(seed => {
    let concatenatedSeeds = '';
    seed.forEach(item => {
      concatenatedSeeds += JSON.stringify(item)
    })
    // now convert concatenated seeds into bytes32
    let finalBytes = ethers.utils.formatBytes32String(concatenatedSeeds)
    if (newUniqueValues[finalBytes]) {
      console.log('found dupe: ', finalBytes)
    } else {
      newUniqueValues[finalBytes] = true
      newArray.push(finalBytes)
    }
  })
  // This should be 1000, meaning we haven't hit any dupes
  console.log(Object.keys(newUniqueValues).length, newArray.length)
  fs.writeFile('seeds-concatenated.json', JSON.stringify(newArray), () => {
    console.log('written')
  })
}

countSeeds()