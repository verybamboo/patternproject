//Fetch Api
//https://www.moogleapi.com/api/v1/characters
let leftButton = document.querySelector('.buttonLeft')
let rightButton = document.querySelector('.buttonRight')
let randomButton = document.querySelector('.random')
let charPicSrc = document.querySelector('.characterPic')
let charInfo = document.querySelector('.charBio')
let charInfo2 = document.querySelector('.charBio2')
let dataSet = [];
let index = 0;


//fetch the api once and put it into an empty array
function fetchData() {
  fetch('https://www.moogleapi.com/api/v1/characters')
    .then(response => response.json())
    .then(result => {
      dataSet.push(...result);
      renderDisplay();
    })
}

console.log(dataSet);

//call function to fetch the api
fetchData();

//puts the img into the src of the div, puts the image on the screen and allows for the image to change all
//each time the index is changed
function renderDisplay() {
  addCharInfo();
  addCharInfo2();
  fixMissingUrl();
  charPicSrc.src = dataSet[index].pictures[0].url;
  console.log(dataSet[index]);
  console.log(index);
}
//this is my function to loop my slide carousel infinitely in a circle, when index is -1, it will just 
//loop to the last element and if you reach the last element, it will loop to the first element on the next
//click 
function loopAround() {
  if (index == dataSet.length) {
    index = 0;
  } else if (index == -1) {
    index = dataSet.length - 1;
  }
}

//clicking the right arrow will increase the index by 1 per click and allow for you to go forwards
//through the characters, once the number hits the last character by index, it will wrap around to the first
//character again
rightButton.addEventListener('click', function () {
  index++;
  loopAround();
  removePrevious();
  renderDisplay();
})

//click the left arrow will go backwards through the characters
leftButton.addEventListener('click', function () {
  index--;
  loopAround();
  removePrevious();
  renderDisplay();
})

//random button for a random character
randomButton.addEventListener('click', function () {
  index = Math.floor(Math.random() * dataSet.length)
  removePrevious();
  renderDisplay();
})


//add relevant information to the first div on the left side
function addCharInfo() {
  let bioInfo = `
      <div class="leftSide">
        <h1>Name: ${dataSet[index].name}</h1>
        <p>Description: ${dataSet[index].description}</p>
      </div>
    `
  document.querySelector('.charBio').insertAdjacentHTML("beforeend", bioInfo);
}

//adds relevant information to the third div on the right side
function addCharInfo2() {
  let bioInfo2 = `
  <div class="rightSide">
    <h1>Japanese Name: ${dataSet[index].japaneseName}</h1>
    <p>Age: ${dataSet[index].age}</p>
    <p>Gender: ${dataSet[index].gender}</p>
    <p>Height: ${dataSet[index].height}</p>
    <p>Job: ${dataSet[index].job}</p>
    <p>Origin: ${dataSet[index].origin}</p>
    <p>Race: ${dataSet[index].race}</p>
    <p>Weight: ${dataSet[index].weight}</p>
  </div>
`
  document.querySelector('.charBio2').insertAdjacentHTML("beforeend", bioInfo2);
}

//adds relevant information to the third div on the right side
function addMonsterInfo2() {
  let monsInfo2 = `
  <div class="rightSide">
    <h1>Japanese Name: ${monsterSet[index].japaneseName}</h1>
    <p>Attack: ${monsterSet[index].attack}</p>
    <p>Defense: ${monsterSet[index].defense}</p>
    <p>Elemental Affinity: ${monsterSet[index].elementalaffinity}</p>
    <p>Elemental Weakness: ${monsterSet[index].elementalweakness}</p>
    <p>Origin: ${monsterSet[index].game}</p>
    <p>Health: ${monsterSet[index].hitpoints}</p>
    <p>Monster Id: ${monsterSet[index].monsterId}</p>
  </div>
`
  document.querySelector('.monsBio2').insertAdjacentHTML("beforeend", monsInfo2);
}

//remove the all html inside the div before adding the new information into the div
function removePrevious() {
  document.querySelector('.charBio').innerHTML = '';
  document.querySelector('.charBio2').innerHTML = '';
}

//the api is missing images for some of the characters so I put a stock picture that indicates that there
//is no available image
function fixMissingUrl() {
  if (dataSet[index].pictures.length == 0) {
    charPicSrc.src = 'missing.svg';
  }
}








