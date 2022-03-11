//Fetch Api
//https://www.moogleapi.com/api/v1/characters
let charPic = document.querySelector('.buttonLeft')
let charPic2 = document.querySelector('.buttonRight')
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
      //console.log(dataSet[0].name);
    })
}

console.log(dataSet);

//call function to fetch the api
fetchData();

//puts the img into the src of the div, puts the image on the screen and allows for the image to change all
//each time the index is changed
function renderDisplay() {
  charPicSrc.src = dataSet[index].pictures[0].url;
  addCharInfo();
  addCharInfo2();
  //console.log(dataSet[0])
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
charPic2.addEventListener('click', function () {
  index++;
  loopAround();
  removePrevious();
  renderDisplay();
  //console.log(dataSet[0])
})

//clicking the left arrow will decrease the index by 1 per click and allow for you to go backwards
//through the characters, once the number hits -1, the function loopAround will trigger and bring the index
//to the last character instead
charPic.addEventListener('click', function () {
  index--;
  loopAround();
  removePrevious();
  renderDisplay();
  //console.log(dataSet[0])
})

//append relevant information to the first div on the left side
function addCharInfo() {
  let bioInfo = `
      <div class="leftSide">
        <h1>Name: ${dataSet[index].name}</h1>
        <p>Descrip: ${dataSet[index].description}</p>
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

//remove the previous appended div before adding the next
function removePrevious() {
  document.querySelector('.charBio').innerHTML = '';
  document.querySelector('.charBio2').innerHTML = '';
}


// charBio.addEventListener('click', () => {
//   console.log(characters[i].name);
//   let bioAdd = document.createElement('p');
//   let bio = document.createTextNode(characters[i].bio);
//   bioAdd.appendChild(bio);
//   //chars[i].appendChild(bio);
//   roster[i].parentElement.childNodes[2].after(bioAdd)
// }, { once: true });






