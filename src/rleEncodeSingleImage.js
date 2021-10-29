import { PNGCollectionEncoder } from '@nouns/sdk';
import { readPngFile } from 'node-libpng';
import { promises as fs } from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const DESTINATION = path.join(__dirname, '../output/singleWearable.json');

const encode = async () => {
  const encoder = new PNGCollectionEncoder()
  const filepath = path.join(__dirname, '../wearablesImages/customGlasses/fast-food-glasses.png')
  const image = await readPngFile(filepath)
  encoder.encodeImage(filepath.replace(/\.png$/, ''), image)
  await encoder.writeToFile(DESTINATION)
  
}

encode()
