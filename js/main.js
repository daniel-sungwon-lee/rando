var $dataViews=document.querySelectorAll("div[data-view]")
var $addButtons=document.querySelectorAll("#add-button")

var $favHeader=document.querySelector("a[data-view='favorites']")
var $favList=document.querySelector("#fav-list")

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

        $favList.appendChild(renderLi(content.text,content.author))

        addedList.favorites.push(content)
        localStorage.setItem("addedList",JSON.stringify(addedList))
      } else if ($h2.getAttribute("id")==="quote"){
        var content=new fav("quote")
        content.text=$h2.textContent
        var $h3 = document.querySelector("#author")
        content.author= $h3.textContent

        $favList.appendChild(renderLi(content.text,content.author))

        addedList.favorites.push(content)
        localStorage.setItem("addedList",JSON.stringify(addedList))
      } else if ($h2.getAttribute("id")==="joke"){
        var content = new fav("joke")
        content.text=$h2.textContent

        $favList.appendChild(renderLi(content.text,content.author))

        addedList.favorites.push(content)
        localStorage.setItem("addedList",JSON.stringify(addedList))
      }
    }
  } else if (event.target.matches("a[data-view='to-do']")){
    swap("to-do")
    $toDoHeader.className="header"
    if (event.target.matches("#add-button")){

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
      var text=userAddedList.favorites[i].text
      var author=userAddedList.favorites[i].author
      $favList.appendChild(renderLi(text,author))
    }
  }
  swap("home")
})

function renderLi (fav,author){
  var $li = document.createElement("li")
  $li.textContent=fav + " "+author
  return $li
}
