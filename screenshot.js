const path = require('path');
const basePath = process.cwd();

const testFolder = './src/templates/pages';
const fs = require('fs');
var webpage = require('webpage').create();


fs.readdirSync(testFolder).forEach(file => {
  console.log(file.split('.')[0]);
  let url = 'http://localhost:1712/pages/' + file.split('.')[0] + '.html';
  console.log(url);

  webpage
  .open(url)
  .then(function(){
    webpage.render(file.split('.')[0] + '.png', { onlyViewport: true });
    slimer.exit()
  });

})



