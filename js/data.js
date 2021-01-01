/* exported data */
const $apiData = document.querySelector("#api-data")

function getAdvice(){
  const xhr = new XMLHttpRequest()
  xhr.open("GET", "https://api.adviceslip.com/advice")
  xhr.addEventListener("load",()=>{
    const data = JSON.parse(xhr.response)
    const $h2 = document.createElement("h2")
    $h2.setAttribute("id","advice")
    $h2.textContent=data.slip.advice
    $apiData.appendChild($h2)
    if ($apiData.querySelector(".spinner")){
      $apiData.querySelector(".spinner").remove()
    }
  })
  xhr.send()
}

function getFamousQuote(){
  const xhr = new XMLHttpRequest()
  xhr.open("GET","https://quote-garden.herokuapp.com/api/v3/quotes/random")
  xhr.addEventListener("load",()=>{
    const data = JSON.parse(xhr.response)
    const $h2=document.createElement("h2")
    $h2.setAttribute("id","quote")
    $h2.textContent=data.data[0].quoteText
    $apiData.appendChild($h2)
    const $h3=document.createElement("h3")
    $h3.setAttribute("id","author")
    $h3.textContent="-"+data.data[0].quoteAuthor
    $apiData.appendChild($h3)
    if ($apiData.querySelector(".spinner")) {
      $apiData.querySelector(".spinner").remove()
    }
  })
  xhr.send()
}

function getDadJoke(){
  const xhr = new XMLHttpRequest()
  xhr.open("GET", "https://icanhazdadjoke.com/")
  xhr.setRequestHeader("Accept","application/json")
  xhr.addEventListener("load",()=>{
    const data = JSON.parse(xhr.response)
    const $h2 = document.createElement("h2")
    $h2.setAttribute("id","joke")
    $h2.textContent=data.joke
    $apiData.appendChild($h2)
    if ($apiData.querySelector(".spinner")) {
      $apiData.querySelector(".spinner").remove()
    }
  })
  xhr.send()
}

function getActivity(){
  const xhr = new XMLHttpRequest()
  xhr.open("GET", "https://www.boredapi.com/api/activity/")
  xhr.addEventListener("load",()=>{
    const data = JSON.parse(xhr.response)
    const $h2=document.createElement("h2")
    $h2.setAttribute("id","activity")
    $h2.textContent=data.activity
    $apiData.appendChild($h2)
    if ($apiData.querySelector(".spinner")) {
      $apiData.querySelector(".spinner").remove()
    }
  })
  xhr.send()
}

function getRecipe(){
  const xhr = new XMLHttpRequest()
  xhr.open("GET", "https://www.themealdb.com/api/json/v1/1/random.php")
  xhr.addEventListener("load",()=>{
    const data = JSON.parse(xhr.response)
    const $h2=document.createElement("h2")
    $h2.setAttribute("id","recipe")
    const $link=document.createElement("a")
    $link.setAttribute("target","_blank")
    $link.setAttribute("href",data.meals[0].strSource)
    $link.setAttribute("class","recipe")
    $link.textContent=data.meals[0].strMeal
    $h2.appendChild($link)
    $apiData.appendChild($h2)
    if ($apiData.querySelector(".spinner")) {
      $apiData.querySelector(".spinner").remove()
    }
  })
  xhr.send()
}

function fav(type){
  this.type=type
  this.text=null
  this.author=""
  this.url=null
}

function todo(type){
  this.type=type
  this.text=null
  this.isComplete=null
}

let addedList= {
  favorites:[],
  toDos:[]
}
