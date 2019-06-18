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
var allImageSecectionTag = document.getElementById('all-images');
var firstImageTag = document.getElementById('first_image_1');
var centralImageTag = document.getElementById('center_image_2');
var lastImageTag = document.getElementById('last_image_3');

var totalClicks = 0;

//Variables to store the images already on the page
var firstImageOnThePage = null;
var centralImageOnThePage = null;
var lastImageOnThePage = null;

//Cerating constructor function 
var NewImage = function(name, url){
  this.name = name;
  this.url = url;
  this.timesShown = 0;
  this.timesClicked = 0;
  NewImage.allImages.push(this);
};

NewImage.allImages = [];

//Prevent last picked images from being appeared again in a coonsecutive way
var renderNewImage = function(firstImage, centerImage, lastImage){
  firstImageTag.src = NewImage.allImages[firstImage].url;
  centralImageTag.src = NewImage.allImages[centerImage].url;
  lastImageTag.src  = NewImage.allImages[lastImage].url;
};

var pickNewImages = function() {
  var firstImage = Math.round(Math.random() * NewImage.allImages.length);
  console.log(firstImage);

  do {
    var centerImage = Math.round(Math.random() * NewImage.allImages.length);
    console.log(centerImage);

  } while (firstImage === centerImage);

  do{
    var lastImage = Math.round(Math.random() * NewImage.allImages.length);
    console.log(lastImage);
  } while (lastImage === centerImage || lastImage === firstImage);

  console.log(NewImage.allImages[firstImage].name, NewImage.allImages[centerImage].name, NewImage.allImages[lastImage].name);

  firstImageOnThePage = NewImage.allImages[firstImage];
  centralImageOnThePage = NewImage.allImages[centerImage];
  lastImageOnThePage = NewImage.allImages[lastImage];

  renderNewImage(firstImage, centerImage, lastImage);

};

var handleClickOnImage = function(event){
  // console.log('Hello!');

  if (totalClicks < 3){
    var imageClickedOn = event.target;
    var id = imageClickedOn.id;

    if (id === 'first_image_1' || id === 'center_image_2' || id === 'last_image_3'){
      if (id === 'first_image_1'){
        firstImageOnThePage.timesClicked++;
      }

      if (id === 'center_image_2'){
        centralImageOnThePage.timesClicked++;
      }

      if ( id === 'last_image_3'){
        lastImageOnThePage.timesClicked++;
      }

      firstImageOnThePage.timesShown++;
      centralImageOnThePage.timesShown++;
      lastImageOnThePage.timesShown++;

      //After we update the old, pick new images 
      pickNewImages();
    }
    console.log(event.target.id);
  }
  //increment amount of clicks
  totalClicks++;

  //When user reaches to 25 clicks, remove the click handleClickOnImage function 
  if(totalClicks === 3) {
    allImageSecectionTag.removeEventListener('click', handleClickOnImage);
  }
};

allImageSecectionTag.addEventListener('click', handleClickOnImage);

//Instantiate my image objects 
new NewImage('bag', 'img/bag.jpg');
new NewImage('banana', 'img/banana.jpg');
new NewImage('bathroom', 'img/bathroom.jpg');
new NewImage('boots', 'img/boots.jpg');
new NewImage('breakfast', 'img/breakfast.jpg');
new NewImage('bubblegum', 'img/bubblegum.jpg');
new NewImage('chair', 'img/chair.jpg');
new NewImage('cthulhu', 'img/cthulhu.jpg');
new NewImage('dog-duck', 'img/dog-duck.jpg');
new NewImage('dragon', 'img/dragon.jpg');
new NewImage('pen', 'img/pen.jpg');
new NewImage('pet-sweep', 'img/pet-sweep.jpg');
new NewImage('scissors', 'img/scissors.jpg');
new NewImage('shark', 'img/shark.jpg');
new NewImage('sweep', 'img/sweep.png');
new NewImage('tauntaun', 'img/tauntaun.jpg');
new NewImage('unicorn', 'img/unicorn.jpg');
new NewImage('usb', 'img/usb.gif');
new NewImage('water-can', 'img/water-can.jpg');
new NewImage('wine-glass', 'img/wine-glass.jpg');


//Track the default images
firstImageOnThePage = NewImage.allImages[0];
centralImageOnThePage = NewImage.allImages[1];
lastImageOnThePage = NewImage.allImages[2];

pickNewImages();


//Displaying clicks for each items 
var displayClickedOnItem = document.getElementById('item-clicks');
var liEl = document.getElementById('li');
liEl.textContent = this.name + ': ';

for(var i =0; i < NewImage.allImages.length;i++){
  liEl =document.createElement('li');
  liEl.textContent = NewImage.allImages[i].totalClicks;
}

displayClickedOnItem.appendChild(liEl);
