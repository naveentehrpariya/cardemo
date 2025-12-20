const sharp = require('sharp');
const path = require('path');

const input = path.join(__dirname, 'public/images/unavailable_stockphoto.avif');
const output = path.join(__dirname, 'public/images/unavailable_stockphoto.webp');

sharp(input)
  .webp({ quality: 80 })
  .toFile(output)
  .then(() => console.log('Converted unavailable_stockphoto.avif to webp'))
  .catch(err => console.error('Error converting file:', err));
