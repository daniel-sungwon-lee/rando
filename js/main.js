var $dataViews=document.querySelectorAll("div[data-view]")
var $addButtons=document.querySelectorAll("#add-button")

var $favHeader=document.querySelector("a[data-view='favorites']")
var $adviceList=document.querySelector("#advices")
var $quoteList=document.querySelector("#quotes")
var $jokeList=document.querySelector("#jokes")

var $toDoHeader=document.querySelector("a[data-view='to-do']")
var $toDoList=document.querySelector("#to-do-list")

var userAddedList=JSON.parse(localStorage.getItem("addedList"))

function swap(view){
  if (view==="home"){
    for (var i =0;i<$dataViews.length;i++){
      if ($dataViews[i].getAttribute("data-view")===view){
        $dataViews[i].className=view
      }else{
        $dataViews[i].className="hidden"
      }
    }
  } else if (view==="random-data"){
    for (var i =0;i<$dataViews.length;i++){
      if ($dataViews[i].getAttribute("data-view")===view){
        $dataViews[i].className=view
      }else{
      $dataViews[i].className="hidden"
      }
    }
  } else if (view==="favorites"){
    for (var i = 0; i < $dataViews.length; i++) {
      if ($dataViews[i].getAttribute("data-view") === view) {
        $dataViews[i].className = view
      } else {
        $dataViews[i].className = "hidden"
      }
    }
  } else if (view==="to-do"){
    for (var i = 0; i < $dataViews.length; i++) {
      if ($dataViews[i].getAttribute("data-view") === view) {
        $dataViews[i].className = view
      } else {
        $dataViews[i].className = "hidden"
      }
    }
  }
}

document.addEventListener("click",function(event){
  if (event.target.matches("#advice-button")){
    swap("random-data")
    getAdvice()
    for (var i = 0; i < $addButtons.length; i++) {
      if ($addButtons[i].matches("a[data-view='favorites']")) {
        $addButtons[i].className = "add-button"
      } else {
        $addButtons[i].className = "add-button hidden"
      }
    }
  } else if (event.target.matches("a[data-view='home']")){
    while ($apiData.firstChild){
      $apiData.firstChild.remove()
    }
    swap("home")
  } else if (event.target.matches("#quote-button")){
    swap("random-data")
    getFamousQuote()
    for (var i =0;i<$addButtons.length;i++){
      if ($addButtons[i].matches("a[data-view='favorites']")){
        $addButtons[i].className="add-button"
      }else {
        $addButtons[i].className="add-button hidden"
      }
    }
  } else if (event.target.matches("#joke-button")){
    swap("random-data")
    getDadJoke()
    for (var i = 0; i < $addButtons.length; i++) {
      if ($addButtons[i].matches("a[data-view='favorites']")) {
        $addButtons[i].className = "add-button"
      } else {
        $addButtons[i].className = "add-button hidden"
      }
    }
  } else if (event.target.matches("#activity-button")){
    swap("random-data")
    getActivity()
    for (var i = 0; i < $addButtons.length; i++) {
      if ($addButtons[i].matches("a[data-view='to-do']")) {
        $addButtons[i].className = "add-button"
      } else {
        $addButtons[i].className = "add-button hidden"
      }
    }
  } else if (event.target.matches("a[data-view='favorites']")){
    swap("favorites")
    $favHeader.className="header"
    if (event.target.matches("#add-button")){
      var $h2 = document.querySelector("h2")
      if ($h2.getAttribute("id")==="advice"){
        var content = new fav("advice")
        content.text=$h2.textContent

        $adviceList.appendChild(renderLi(content.text,content.author))

        addedList.favorites.push(content)
        localStorage.setItem("addedList",JSON.stringify(addedList))
      } else if ($h2.getAttribute("id")==="quote"){
        var content=new fav("quote")
        content.text=$h2.textContent
        var $h3 = document.querySelector("#author")
        content.author= $h3.textContent

        $quoteList.appendChild(renderLi(content.text,content.author))

        addedList.favorites.push(content)
        localStorage.setItem("addedList",JSON.stringify(addedList))
      } else if ($h2.getAttribute("id")==="joke"){
        var content = new fav("joke")
        content.text=$h2.textContent

        $jokeList.appendChild(renderLi(content.text,content.author))

        addedList.favorites.push(content)
        localStorage.setItem("addedList",JSON.stringify(addedList))
      }
    }
  } else if (event.target.matches("a[data-view='to-do']")){
    swap("to-do")
    $toDoHeader.className="header"
    if (event.target.matches("#add-button")){
      var $h2=document.querySelector("h2")
      if ($h2.getAttribute("id")==="activity"){
        var content=new todo("activity")
        content.text=$h2.textContent
        content.isComplete=false

        $toDoList.appendChild(renderCheckLi(content.text))

        addedList.toDos.push(content)
        localStorage.setItem("addedList",JSON.stringify(addedList))
      }
    }
  }
})

document.addEventListener("DOMContentLoaded", function(event){
  if (userAddedList!==null){
    addedList=userAddedList
    swap("home")
    $favHeader.className="header"
    $toDoHeader.className="header"

    for (var i=0;i<userAddedList.favorites.length;i++){
      if (userAddedList.favorites[i].type==="advice"){
        var text=userAddedList.favorites[i].text
        var author=userAddedList.favorites[i].author
        $adviceList.appendChild(renderLi(text,author))
      } else if (userAddedList.favorites[i].type==="quote"){
        var text = userAddedList.favorites[i].text
        var author = userAddedList.favorites[i].author
        $quoteList.appendChild(renderLi(text, author))
      } else if (userAddedList.favorites[i].type==="joke"){
        var text = userAddedList.favorites[i].text
        var author = userAddedList.favorites[i].author
        $jokeList.appendChild(renderLi(text, author))
      }
    }

    for (var i=0;i<userAddedList.toDos.length;i++){
      var text = userAddedList.toDos[i].text
      $toDoList.appendChild(renderCheckLi(text))
    }

    var $checkbox=document.querySelectorAll(".checkbox")
    for (var i =0;i<$checkbox.length;i++){
      $checkbox[i].checked=userAddedList.toDos[i].isComplete
    }
  }
  swap("home")
})

$toDoList.addEventListener("change",function(event){
  var todoText=event.target.getAttribute("id")
  for (var i=0;i<addedList.toDos.length;i++){
    if (addedList.toDos[i].text===todoText){
      addedList.toDos[i].isComplete=event.target.checked
      localStorage.setItem("addedList",JSON.stringify(addedList))
    }
  }
})

function renderLi (text,author){
  var $li = document.createElement("li")

  var $pText=document.createElement("p")
  $pText.textContent=text
  $li.appendChild($pText)

  var $pAuthor=document.createElement("p")
  $pAuthor.textContent=author
  $li.appendChild($pAuthor)

  return $li
}

function renderCheckLi (text){
  var $li = document.createElement("li")
  $li.setAttribute("class","check-li")

  var $checkbox=document.createElement("input")
  $checkbox.setAttribute("type","checkbox")
  $checkbox.setAttribute("id",text)
  $checkbox.setAttribute("class","checkbox")
  $li.appendChild($checkbox)

  var $label=document.createElement("label")
  $label.setAttribute("for",text)
  $label.setAttribute("class","label")
  $label.textContent=text
  $li.appendChild($label)

  return $li
}
