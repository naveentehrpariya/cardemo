const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const input = 'public/images/unavailable_stockphoto.avif';
const output = 'public/images/unavailable_stockphoto.webp';

sharp(input)
  .webp({ quality: 80 })
  .toFile(output)
  .then(() => console.log('Converted avif to webp'))
  .catch(err => console.error(err));
