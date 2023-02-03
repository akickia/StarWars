//https://swapi.dev

let page = 1
let charList = document.querySelector(".char-ul")
let URL_base = "https://swapi.dev/api/"

//https://swapi.dev/api/people/?page=2
async function findNames() {
  try {
    let data = await fetch(URL_base + "people/?page=" + page);
    data = await data.json()
    console.log(data)
    data = data.results
    console.log(data)
    showName(data)

  }
  catch (error) {
    console.log(error)
  }
}


document.querySelector(".next").addEventListener("click", () => {
  if (page < 9) {
    document.querySelector(".prev").style.color = "black"
    charList.innerHTML = `<img src="https://media.giphy.com/media/6036p0cTnjUrNFpAlr/giphy.gif">`
    page++
    document.querySelector(".nrPage").innerText = page
    findNames()
    if (page == 9) {
      document.querySelector(".next").style.color = "lightgray"
    }
  }
  else {
    document.querySelector(".next").style.color = "lightgray"
  }
})

document.querySelector(".prev").addEventListener("click", () => {
  if (page > 1) {
    document.querySelector(".next").style.color = "black"
    charList.innerHTML = `<img src="https://media.giphy.com/media/6036p0cTnjUrNFpAlr/giphy.gif">`
    page--
    document.querySelector(".nrPage").innerText = page
    findNames()
    if (page == 1) {
      document.querySelector(".prev").style.color = "lightgray"
    }
  }
  else {
    document.querySelector(".prev").style.color = "lightgray"
  }
})




//Funktion för att skapa nya li-element för varje person
function showName(data) {
  charList.innerHTML = ""
    data.forEach(person => {
      let newLiEl = document.createElement("li")
      newLiEl.innerHTML = person.name
      charList.appendChild(newLiEl)
      newLiEl.addEventListener("click", () => {
        document.querySelector(".info-container__planet h3").innerText = ""
        document.querySelector(".info-container__name h3").innerText = ""
        planetList.innerHTML = `<img src="https://media.giphy.com/media/6036p0cTnjUrNFpAlr/giphy.gif">`
        personList.innerHTML = `<img src="https://media.giphy.com/media/6036p0cTnjUrNFpAlr/giphy.gif">`
        console.log(person.name)
        findPlanet(person)
      })
    })
  }
  

  findNames()

  let planetList = document.getElementById("home-info")
  let personList = document.getElementById("char-info")

async function findPlanet(person) {
  try {
    let planet = await fetch(person.homeworld);
    planet = await planet.json()
    showPlanetInfo(planet)
    showPersonInfo(person)
  }
  catch (error) {
    console.log(error)
  }
}


function showPlanetInfo(planet) {
  document.querySelector(".info-container__planet h3").innerText = planet.name
  planetList.innerHTML = `<li>Rotation period: ${planet.rotation_period}h</li>
  <li>Orbital period: ${planet.orbital_period} days</li>
  <li>Diameter: ${planet.diameter}km</li>
  <li>Climate: ${planet.climate}</li>
  <li>Gravity: ${planet.gravity}</li>
  <li>Terrain: ${planet.terrain}</li>`
}

function showPersonInfo(person) {
  document.querySelector(".info-container__name h3").innerText = person.name
  personList.innerHTML = `<li>Height: ${person.height}cm</li>
  <li>Mass: ${person.mass}kg</li>
  <li>Hair color: ${person.hair_color}</li>
  <li>Skin color: ${person.skin_color}</li>
  <li>Eye color: ${person.eye_color}</li>
  <li>Birth year: ${person.birth_year}</li>
  <li>Gende: ${person.gender}</li>`
}