import { ffnContractFactory } from './ffnContractFactory.js'
import fs from 'fs'
import { ethers } from 'ethers'

// fetch each seed, compose a list, and print it to a file
const fetchSeedsAndPrint = async () => {
  let contract = await ffnContractFactory()
  let finalList = []
  for (let i = 0; i < 1000; i++) {
    let seed = await contract.seeds(i)
    finalList.push(seed)
  }
  fs.writeFile('seeds.json', JSON.stringify(finalList), () => {
    console.log('written')
  })
}

fetchSeedsAndPrint()
