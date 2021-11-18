import { imageData } from '../imageData.js'
import { buildSVG } from '@nouns/sdk'
import fs from 'fs'

const getSnippet = (data, replaceWord, appendWord) => {
  const palette = imageData.palette
  const opening = `<svg width="320" height="320" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#00000" />`
  const closing = `</svg>`
  let svg = buildSVG([data], palette, '00000')
  svg = svg.replace(opening, '')
  svg = svg.replace(closing, '')
  return {
    innerSVG: svg,
    name: convertName(data.filename, replaceWord, appendWord)
  }
}

const convertName = (filename, replaceWord, appendWord) => {
  // Remove beginning prefix
  let name = filename.replace(replaceWord, '')

  // Remove dashes
  name = name.replace(/-/g, ' ');

  // Title case
  name = name.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    }
  )

  // Append last word
  name = name.concat(' ' + appendWord)

  return name
}

const decode = () => {

  const finalSVGs = {
    bodies: [],
    glasses: [],
    heads: [],
    accessories: []
  }
  
  // BODIES
  for (let body of imageData.images.bodies) {
    finalSVGs.bodies.push(getSnippet(body, 'body-', 'Shirt'))
    // console.log(finalSVGs.bodies)
  }

  // GLASSES
  for (let glasses of imageData.images.glasses) {
    finalSVGs.glasses.push(getSnippet(glasses, 'glasses-', 'Glasses'))
  }

  // HEADS
  for (let head of imageData.images.heads) {
    finalSVGs.heads.push(getSnippet(head, 'head-', 'Head'))
  }

  // ACCESSORIES
  for (let accessory of imageData.images.accessories) {
    finalSVGs.accessories.push(getSnippet(accessory, 'accessory-', 'Accessory'))
  }

  let str = JSON.stringify(finalSVGs)
  // str = str.replace(/\\/g, '');

  fs.writeFile('svgData.json', str, (err) => {
    if (err) console.log(err)
	});

}

decode()