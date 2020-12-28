/* exported data */
var $apiData = document.querySelector("#api-data")

function getAdvice(){
  var xhr = new XMLHttpRequest()
  xhr.open("GET", "https://api.adviceslip.com/advice")
  xhr.addEventListener("load", function(){
    var data = JSON.parse(xhr.response)
    var $h2 = document.createElement("h2")
    $h2.setAttribute("id","advice")
    $h2.textContent=data.slip.advice
    $apiData.appendChild($h2)
  })
  xhr.send()
}

function getFamousQuote(){
  var xhr = new XMLHttpRequest()
  xhr.open("GET","https://quote-garden.herokuapp.com/api/v3/quotes/random")
  xhr.addEventListener("load",function(){
    var data = JSON.parse(xhr.response)
    var $h2=document.createElement("h2")
    $h2.setAttribute("id","quote")
    $h2.textContent=data.data[0].quoteText
    $apiData.appendChild($h2)
    var $h3=document.createElement("h3")
    $h3.setAttribute("id","author")
    $h3.textContent="-"+data.data[0].quoteAuthor
    $apiData.appendChild($h3)
  })
  xhr.send()
}

function getDadJoke(){
  var xhr = new XMLHttpRequest()
  xhr.open("GET", "https://icanhazdadjoke.com/")
  xhr.setRequestHeader("Accept","application/json")
  xhr.addEventListener("load",function(){
    var data = JSON.parse(xhr.response)
    var $h2 = document.createElement("h2")
    $h2.setAttribute("id","joke")
    $h2.textContent=data.joke
    $apiData.appendChild($h2)
  })
  xhr.send()
}

function getActivity(){
  var xhr = new XMLHttpRequest()
  xhr.open("GET", "https://www.boredapi.com/api/activity/")
  xhr.addEventListener("load", function () {
    var data = JSON.parse(xhr.response)
    var $h2=document.createElement("h2")
    $h2.setAttribute("id","activity")
    $h2.textContent=data.activity
    $apiData.appendChild($h2)
  })
  xhr.send()
}

function getRecipe(){
  var xhr = new XMLHttpRequest()
  xhr.open("GET", "https://www.themealdb.com/api/json/v1/1/random.php")
  xhr.addEventListener("load",function(){
    var data = JSON.parse(xhr.response)
    var $h2=document.createElement("h2")
    $h2.setAttribute("id","recipe")
    var $link=document.createElement("a")
    $link.setAttribute("target","_blank")
    $link.setAttribute("href",data.meals[0].strSource)
    $link.setAttribute("class","recipe")
    $link.textContent=data.meals[0].strMeal
    $h2.appendChild($link)
    $apiData.appendChild($h2)
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

var addedList= {
  favorites:[],
  toDos:[]
}
