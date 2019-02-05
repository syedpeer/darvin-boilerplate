/**
 * @file Darvin Element Activity
 * @author Tobias Frei
 *
 * TODO!: cleanup and refactor
 *
 * @module activity
 */

let instance = {},
      defaults = {
        container: '.prev-m-index',
        days: 20,
        height: 100,
        width: 360,
        maxHeight: '80',
        colors: {
          grey1: '#363636',
          grey2: '#343434',
          grey3: '#292929'
        }
      };

// Module Variables
let settings = {},
    container,
    moduleCards,
    j;

// Private Functions
const initCard = (card) => {
  if(card.querySelector('a[data-dep]')) {
    card.querySelector('a[data-dep]').addEventListener('click', initClick);
  }
},
initClick = (e) => {
  let card = e.currentTarget.closest('.prev-m-index__item'),
      path = card.getAttribute('data-path'),
      url = `${path}/meta/dependencies.json`,
      name = card.getAttribute('data-name'),
      type = card.getAttribute('data-type');


  loadJson(url, name, type, card, path);
},
loadJson = (url, name, type, el, path) => {
  fetch(url)
    .then(response => {
      if (response.ok) {
        return Promise.resolve(response);
      }
      else {
        return Promise.reject(new Error('Failed to load'));
      }
    })
    .then(response => response.text())
    .then((data) => {
      //pointArr[name] = [];

      let dataArr = JSON.parse(data);
      let pathArr = [];

      let source = document.querySelector('.prev-m-index__item[data-path="' + path + '"]');

      dataArr.forEach((dataItem) => {
        dataItem = dataItem.substring(0, dataItem.lastIndexOf("/"));

        if(path!==dataItem) {
          pathArr.push(dataItem);
          let target = document.querySelector('.prev-m-index__item[data-path="' + dataItem + '"]');

          connect(source, target);
        }
      });

      el.setAttribute('data-dep', pathArr);
    })
    .catch(function(error) {
      console.error(`Error: ${error.message}`);
    });

},
connect = (source, target) => {

  j = require("../../../node_modules/jsplumb/dist/js/jsplumb.js").jsPlumb.getInstance({
    Connector: ["Flowchart", {lineWidth:2, strokeStyle:'green'}, {cssClass:"connectorClass", lineWidth:2, strokeStyle:'green'}],
    Anchor: "Bottom",
    Endpoint: [ "Dot", { radius: 1 }],
    paintStyle:{ lineWidth:2, strokeStyle:'green' },
    ConnectionOverlays: [
        [ "Arrow", { location: 0, width: 6, length: 10, foldbackPoint: 0.62, direction:-1 }]
    ]
  });


  console.log("Connect Elements!");
  console.log(source);
  console.log(target);
  j.connect({paintStyle:{ stroke:"#e8175d", strokeWidth:1 }, source: source, target: target });
};


/**
 * Initialize module
 *
 * @param {object} options - Override default settings with options object.
 * @return {object|undefined} Instance of created module.
 */

instance.init = (options) => {
  Object.assign(settings, defaults, options);

  // Public Code
  container = document.querySelector(settings.container);

  if(!container) return;

  moduleCards = container.querySelectorAll('.prev-m-index__item');

  if(!moduleCards) return;

  [...moduleCards].forEach((moduleCard) => {
    initCard(moduleCard);
  });

  return instance;
};

export default instance;
