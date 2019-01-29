/*const path = require('path');

const basePath = process.cwd();

const testFolder = './src/templates/pages';
const fs = require('fs');
const webpage = require('webpage').create();


fs.readdirSync(testFolder).forEach((file) => {
  console.log(file.split('.')[0]);
  const url = `http://localhost:1712/pages/${file.split('.')[0]}.html`;
  console.log(url);

  webpage
    .open(url)
    .then(() => {
      webpage.render(`${file.split('.')[0]}.png`, { onlyViewport: true });
      slimer.exit();
    });
});*/
