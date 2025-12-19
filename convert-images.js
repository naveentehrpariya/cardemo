const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const directory = path.join(__dirname, 'public', 'images');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

async function convertImages() {
  const files = getAllFiles(directory);
  
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
      const newFile = file.replace(ext, '.webp');
      
      // Skip if webp already exists (optional, but good for idempotency)
      // Actually user said "optimize all", so maybe overwrite?
      // But we are creating NEW files, not replacing.
      // So check if newFile exists.
      
      if (!fs.existsSync(newFile)) {
        console.log(`Converting ${file} to ${newFile}`);
        try {
          await sharp(file)
            .webp({ quality: 80 }) // Reasonable quality
            .toFile(newFile);
          console.log(`Converted: ${path.basename(file)} -> ${path.basename(newFile)}`);
        } catch (error) {
          console.error(`Error converting ${file}:`, error);
        }
      } else {
        console.log(`Skipping ${file}, ${path.basename(newFile)} already exists.`);
      }
    }
  }
}

convertImages();
