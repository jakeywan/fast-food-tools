import { PNGCollectionEncoder } from '@nouns/sdk';
import { readPngFile } from 'node-libpng';
import { promises as fs } from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log('test', __dirname)

const DESTINATION = path.join(__dirname, './output/image-data.json');

const encode = async () => {
  const encoder = new PNGCollectionEncoder();
  const image = await readPngFile(path.join(__dirname, '/empty-png.png'));
  encoder.encodeImage('output.png', image);
  await encoder.writeToFile(DESTINATION);
};

encode();