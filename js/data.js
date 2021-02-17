/* exported data */
const $apiData = document.querySelector("#api-data")

function getAdvice(){
  const xhr = new XMLHttpRequest()
  xhr.open("GET", "https://api.adviceslip.com/advice")
  xhr.onerror = () => alert("A network error has occured; please check your connection")
  xhr.addEventListener("load",()=>{
    const data = JSON.parse(xhr.response)
    let {slip:{advice}}=data

    const $h2 = document.createElement("h2")
    $h2.setAttribute("id","advice")
    $h2.textContent=advice
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
  xhr.onerror = () => alert("A network error has occured; please check your connection")
  xhr.addEventListener("load",()=>{
    const data = JSON.parse(xhr.response)
    let {data:dataArr}=data
    let [dataArrObj]=dataArr
    let {quoteAuthor:author,quoteText:text}=dataArrObj

    const $h2=document.createElement("h2")
    $h2.setAttribute("id","quote")
    $h2.textContent=text
    $apiData.appendChild($h2)

    const $h3=document.createElement("h3")
    $h3.setAttribute("id","author")
    $h3.textContent=`-${author}`
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
  xhr.onerror = () => alert("A network error has occured; please check your connection")
  xhr.addEventListener("load",()=>{
    const data = JSON.parse(xhr.response)
    let {joke}=data

    const $h2 = document.createElement("h2")
    $h2.setAttribute("id","joke")
    $h2.textContent=joke
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
  xhr.onerror = () => alert("A network error has occured; please check your connection")
  xhr.addEventListener("load",()=>{
    const data = JSON.parse(xhr.response)
    let {activity}=data

    const $h2=document.createElement("h2")
    $h2.setAttribute("id","activity")
    $h2.textContent=activity
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
  xhr.onerror = () => alert("A network error has occured; please check your connection")
  xhr.addEventListener("load",()=>{
    const data = JSON.parse(xhr.response)
    let {meals}=data
    let [mealsArr]=meals
    let {strMeal,strSource}=mealsArr

    const $h2=document.createElement("h2")
    $h2.setAttribute("id","recipe")
    $apiData.appendChild($h2)

    const $link=document.createElement("a")
    $link.setAttribute("target","_blank")
    $link.setAttribute("href",strSource)
    $link.setAttribute("class","recipe")
    $link.textContent=strMeal
    $h2.appendChild($link)

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

const userAddedList = JSON.parse(localStorage.getItem("addedList"))

let {favorites,toDos}=userAddedList
