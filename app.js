/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use strict';

/*
TODO:
Select 3 random photos
Display them side-by-side
Receive clicks on those displayed images and track those clicks for each image
  click on image
    event listener fires the event handler
      check if total click is 25
        if yes, stop displaying image and let the user know
        display the clicks
Also track how many times each image is displayed 
Upon receiving click, three new non-duplicating random images need to be displayed 
  build a constructor function 
    var NewImage = fucntion(name, url, timesShown, timesClicked){
      this.name = name;
      this.url = url;
      this.timesShown = 0;
      this.timesClicked = 0;
    }
After 25 selection, turn off event listeners 
Display result 
*/

//Global Variables 
console.log('hello');
var allImageSecectionTag = document.getElementById('all-images');
var displayList = document.getElementById('item-list');

var firstImageTag = document.getElementById('first_image_1');
var centerImageTag = document.getElementById('center_image_2');
var lastImageTag = document.getElementById('last_image_3');

var totalClicks = 0;
var maxClicks = 25;

//Cerating constructor function 
var Item = function (name, imgSrc = 'default.jpg', timesClicked, timesShown) {
  this.name = name;
  this.url = imgSrc;
  //ternary operator 
  this.timesClicked = timesClicked ? timesClicked : 0;
  this.timesShown = timesShown || 0;
  Item.allImages.push(this);
};

Item.allImages = [];
Item.oldImages = [];

//Instantiate my image objects 
var buildImages = function () {
  new Item('bag', 'img/bag.jpg');
  new Item('banana', 'img/banana.jpg');
  new Item('bathroom', 'img/bathroom.jpg');
  new Item('boots', 'img/boots.jpg');
  new Item('breakfast', 'img/breakfast.jpg');
  new Item('bubblegum', 'img/bubblegum.jpg');
  new Item('chair', 'img/chair.jpg');
  new Item('cthulhu', 'img/cthulhu.jpg');
  new Item('dog-duck', 'img/dog-duck.jpg');
  new Item('dragon', 'img/dragon.jpg');
  new Item('pen', 'img/pen.jpg');
  new Item('pet-sweep', 'img/pet-sweep.jpg');
  new Item('scissors', 'img/scissors.jpg');
  new Item('shark', 'img/shark.jpg');
  new Item('sweep', 'img/sweep.png');
  new Item('tauntaun', 'img/tauntaun.jpg');
  new Item('unicorn', 'img/unicorn.jpg');
  new Item('usb', 'img/usb.gif');
  new Item('water-can', 'img/water-can.jpg');
  new Item('wine-glass', 'img/wine-glass.jpg');
};

//Random generator 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}
console.log("hey");
//Prevent last picked images from being appeared again in a coonsecutive way

var pickNewImages = function (currentPicture) {
  var index, image;

  do {
    index = getRandomIntInclusive(0, Item.allImages.length - 1);
    image = Item.allImages[index];

  } while (Item.oldImages.includes(image) || currentPicture.includes(image));

  return image;
};

//Rendering 3 new images in single pannel 
var renderNewImages = function () {
  // console.log('firstImage: ' + firstImage);
  var currentPicture = [];
  var firstImage = pickNewImages(currentPicture);
  currentPicture.push(firstImage);
  var centerImage = pickNewImages(currentPicture);
  currentPicture.push(centerImage);
  var lastImage = pickNewImages(currentPicture);
  currentPicture.push(lastImage);

  firstImageTag.src = firstImage.url;
  centerImageTag.src = centerImage.url;
  lastImageTag.src = lastImage.url;
  //pushing current picturres to the old image array
  Item.oldImages = currentPicture;
};

//Function that handle click event
var handleClickOnImage = function (event) {

  totalClicks++;
  console.log('totalClicks: ' + totalClicks);
  console.log(Item.oldImages);
  console.log(event.target.id);

  if (event.target.id === 'first_image_1') {
    Item.oldImages[0].timesClicked++;
    console.log(Item.oldImages.timesClicked);
  }

  if (event.target.id === 'center_image_2') {
    Item.oldImages[1].timesClicked++;
  }

  if (event.target.id === 'last_image_3') {
    Item.oldImages[2].timesClicked++;
  }
  for (var i = 0; i < Item.oldImages.length; i++) {
    Item.oldImages[i].timesShown++;
  }
  if (totalClicks < maxClicks) {
    renderNewImages();
  } else {
    allImageSecectionTag.removeEventListener('click', handleClickOnImage);

    busChart();

  }
};

//Loading page 
var loadPage = function () {
  buildImages();
  renderNewImages();
  allImageSecectionTag.addEventListener('click', handleClickOnImage);
};

loadPage();

//Create Bus Chart 
function busChart() {
  var ctx = document.getElementById('results');
  var percents = [];
  var names = [];


  for (var i = 0; i < Item.allImages.length; i++) {
    var p = Math.floor((Item.allImages[i].timesClicked / Item.allImages[i].timesShown) * 100);
    names.push(Item.allImages[i].name);
    percents.push(p);

  }
  var chartData = {
    labels: names,
    datasets: [{
      label: '# of Votes',
      data: percents,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  };

  var busChartObject = {
    type: 'pie',
    data : chartData,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  };
  var buschart = new Chart(ctx, busChartObject);

}
