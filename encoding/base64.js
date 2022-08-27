const fs = require('fs').promises;
const path = require('path');

(async () => {
  const imagePath = path.join(__dirname, 'amo_a_rezar.jpg');

  const imageBinary = await fs.readFile(imagePath, 'binary');

  //   console.log(imageBinary.slice(0, 200));

  const image = Buffer.from(imageBinary);

  console.log(image);

  console.log(image.toString('base64'));
})();
