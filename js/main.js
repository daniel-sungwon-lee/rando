var $main=document.querySelector("main")

var $dataViews=document.querySelectorAll("div[data-view]")
var $addButtons=document.querySelectorAll("#add-button")

var $favHeader=document.querySelector("a[data-view='favorites']")
var $adviceList=document.querySelector("#advices")
var $quoteList=document.querySelector("#quotes")
var $jokeList=document.querySelector("#jokes")
var $recipeList=document.querySelector("#recipes")

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
        $addButtons[i].className = "add-button landscape"
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
        $addButtons[i].className="add-button landscape"
      }else {
        $addButtons[i].className="add-button hidden"
      }
    }
  } else if (event.target.matches("#joke-button")){
    swap("random-data")
    getDadJoke()
    for (var i = 0; i < $addButtons.length; i++) {
      if ($addButtons[i].matches("a[data-view='favorites']")) {
        $addButtons[i].className = "add-button landscape"
      } else {
        $addButtons[i].className = "add-button hidden"
      }
    }
  } else if (event.target.matches("#activity-button")){
    swap("random-data")
    getActivity()
    for (var i = 0; i < $addButtons.length; i++) {
      if ($addButtons[i].matches("a[data-view='to-do']")) {
        $addButtons[i].className = "add-button landscape"
      } else {
        $addButtons[i].className = "add-button hidden"
      }
    }
  } else if (event.target.matches("#recipe-button")){
    swap("random-data")
    getRecipe()
    for (var i = 0; i < $addButtons.length; i++) {
      if ($addButtons[i].matches("a[data-view='favorites']")) {
        $addButtons[i].className = "add-button landscape"
      } else {
        $addButtons[i].className = "add-button hidden"
      }
    }
  } else if (event.target.matches("a[data-view='favorites']")){
    swap("favorites")
    $favHeader.className="header narrow"
    if (event.target.matches("#add-button")){
      var $h2 = document.querySelector("h2")
      if ($h2.getAttribute("id")==="advice"){
        $adviceList.firstElementChild.className="title"

        var content = new fav("advice")
        content.text=$h2.textContent

        $adviceList.appendChild(renderLi(content.text,content.author))

        addedList.favorites.push(content)
        localStorage.setItem("addedList",JSON.stringify(addedList))
      } else if ($h2.getAttribute("id")==="quote"){
        $quoteList.firstElementChild.className="title"

        var content=new fav("quote")
        content.text=$h2.textContent
        var $h3 = document.querySelector("#author")
        content.author= $h3.textContent

        $quoteList.appendChild(renderLi(content.text,content.author))

        addedList.favorites.push(content)
        localStorage.setItem("addedList",JSON.stringify(addedList))
      } else if ($h2.getAttribute("id")==="joke"){
        $jokeList.firstElementChild.className="title"

        var content = new fav("joke")
        content.text=$h2.textContent

        $jokeList.appendChild(renderLi(content.text,content.author))

        addedList.favorites.push(content)
        localStorage.setItem("addedList",JSON.stringify(addedList))
      } else if ($h2.getAttribute("id")==="recipe"){
        $recipeList.firstElementChild.className="title"

        var content = new fav("recipe")
        content.text=$h2.textContent
        content.url = $h2.firstElementChild.getAttribute("href")

        $recipeList.appendChild(renderRecipeLi(content.text,content.url))

        addedList.favorites.push(content)
        localStorage.setItem("addedList",JSON.stringify(addedList))
      }
    }
  } else if (event.target.matches("a[data-view='to-do']")){
    swap("to-do")
    $toDoHeader.className="header narrow"
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
  } else if (event.target.matches("#delete")){
    $main.appendChild(renderModal())
    var clickedList=event.target.closest("li")

    var $overlay=document.querySelector("#overlay")
    $overlay.addEventListener("click",function(event){
      if (event.target.matches("#delete-confirm")){
        var $favLists=document.querySelectorAll("#fav-li")
        var $checkLists=document.querySelectorAll("#check-li")

        for (var i =0;i<$favLists.length;i++){
          if (clickedList===$favLists[i]){
            var text=$favLists[i].getElementsByTagName("p")[0].textContent
            for (var i=0;i<addedList.favorites.length;i++){
              if (addedList.favorites[i].text===text){
                addedList.favorites.splice(i,1)
                localStorage.setItem("addedList",JSON.stringify(addedList))
              }
            }
          }
        }

        for (var i=0;i<$checkLists.length;i++){
          if (clickedList===$checkLists[i]){
            addedList.toDos.splice(i,1)
            localStorage.setItem("addedList",JSON.stringify(addedList))
          }
        }
        clickedList.remove()
        $overlay.remove()

        var $adviceLi = $adviceList.getElementsByTagName("li")
        var $quoteLi = $quoteList.getElementsByTagName("li")
        var $jokeLi = $jokeList.getElementsByTagName("li")
        var $recipeLi = $recipeList.getElementsByTagName("li")

        if ($adviceLi.length===0 && $quoteLi.length===0 && $jokeLi.length===0 && $recipeLi.length===0) {
          $favHeader.className = "hidden"
          swap("home")
        }

        if ($adviceLi.length === 0) {
          $adviceList.firstElementChild.className = "hidden"
        }
        if ($quoteLi.length === 0) {
          $quoteList.firstElementChild.className = "hidden"
        }
        if ($jokeLi.length === 0) {
          $jokeList.firstElementChild.className = "hidden"
        }
        if ($recipeLi.length===0) {
          $recipeList.firstElementChild.className="hidden"
        }

        var $toDoLi=$toDoList.getElementsByTagName("li")

        if ($toDoLi.length===0){
          $toDoHeader.className="hidden"
          swap("home")
        }
      }
    })
  } else if (event.target.matches("#undo")){
    document.querySelector("#overlay").remove()
  } else if (event.target.matches("#reload")){
    var type=document.querySelector("#api-data").firstElementChild.getAttribute("id")

    if (type==="advice"){
      while (document.querySelector("#api-data").firstElementChild){
        document.querySelector("#api-data").firstElementChild.remove()
      }
      getAdvice()
    } else if (type==="quote"){
      while (document.querySelector("#api-data").firstElementChild) {
        document.querySelector("#api-data").firstElementChild.remove()
      }
      getFamousQuote()
    } else if (type==="joke"){
      while (document.querySelector("#api-data").firstElementChild) {
        document.querySelector("#api-data").firstElementChild.remove()
      }
      getDadJoke()
    } else if (type==="activity"){
      while (document.querySelector("#api-data").firstElementChild) {
        document.querySelector("#api-data").firstElementChild.remove()
      }
      getActivity()
    } else if (type==="recipe"){
      while(document.querySelector("#api-data").firstElementChild){
        document.querySelector("#api-data").firstElementChild.remove()
      }
      getRecipe()
    }
  }
})

document.addEventListener("DOMContentLoaded", function(event){
  if (userAddedList!==null){
    addedList=userAddedList
    swap("home")

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

      } else if (userAddedList.favorites[i].type==="recipe"){
        var text=userAddedList.favorites[i].text
        var url=userAddedList.favorites[i].url
        $recipeList.appendChild(renderRecipeLi(text,url))
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

  var $adviceLi = $adviceList.getElementsByTagName("li")
  var $quoteLi = $quoteList.getElementsByTagName("li")
  var $jokeLi = $jokeList.getElementsByTagName("li")
  var $recipeLi = $recipeList.getElementsByTagName("li")

  if ($adviceLi.length>0 || $quoteLi.length>0 || $jokeLi.length>0 || $recipeLi.length>0){
    $favHeader.className = "header narrow"
  }

  if ($adviceLi.length===0) {
    $adviceList.firstElementChild.className="hidden"
  }
  if ($quoteLi.length === 0) {
    $quoteList.firstElementChild.className = "hidden"
  }
  if ($jokeLi.length === 0) {
    $jokeList.firstElementChild.className = "hidden"
  }
  if ($recipeLi.length===0) {
    $recipeList.firstElementChild.className="hidden"
  }

  var $toDoLi=$toDoList.getElementsByTagName("li")

  if ($toDoLi.length>0){
    $toDoHeader.className="header narrow"
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
  $li.setAttribute("id","fav-li")

  var $pDiv=document.createElement("div")
  $li.appendChild($pDiv)

  var $pText=document.createElement("p")
  $pText.textContent=text
  $pDiv.appendChild($pText)

  var $pAuthor=document.createElement("p")
  $pAuthor.textContent=author
  $pDiv.appendChild($pAuthor)

  var $delDiv = document.createElement("div")
  $delDiv.setAttribute("class", "del-div")
  $li.appendChild($delDiv)

  var $delete=document.createElement("i")
  $delete.setAttribute("class","fas fa-trash")
  $delete.setAttribute("id","delete")
  $delDiv.appendChild($delete)

  return $li
}

function renderCheckLi (text){
  var $li = document.createElement("li")
  $li.setAttribute("class","check-li")
  $li.setAttribute("id","check-li")

  var $divLi=document.createElement("div")
  $divLi.setAttribute("class","div-li")
  $li.appendChild($divLi)

  var $checkbox=document.createElement("input")
  $checkbox.setAttribute("type","checkbox")
  $checkbox.setAttribute("id",text)
  $checkbox.setAttribute("class","checkbox")
  $divLi.appendChild($checkbox)

  var $label=document.createElement("label")
  $label.setAttribute("for",text)
  $label.setAttribute("class","label")
  $label.textContent=text
  $divLi.appendChild($label)

  var $delDiv=document.createElement("div")
  $delDiv.setAttribute("class","del-div")
  $li.appendChild($delDiv)

  var $delete=document.createElement("i")
  $delete.setAttribute("class","fas fa-trash")
  $delete.setAttribute("id","delete")
  $delDiv.appendChild($delete)

  return $li
}

function renderRecipeLi (text,url){
  var $li = document.createElement("li")
  $li.setAttribute("id", "fav-li")

  var $pDiv = document.createElement("div")
  $li.appendChild($pDiv)

  var $link = document.createElement("a")
  $link.setAttribute("class","recipe")
  $link.setAttribute("href",url)
  $pDiv.appendChild($link)

  var $pText = document.createElement("p")
  $pText.textContent = text
  $link.appendChild($pText)

  var $delDiv = document.createElement("div")
  $delDiv.setAttribute("class", "del-div")
  $li.appendChild($delDiv)

  var $delete = document.createElement("i")
  $delete.setAttribute("class", "fas fa-trash")
  $delete.setAttribute("id", "delete")
  $delDiv.appendChild($delete)

  return $li
}

function renderModal(){
  var $divOverlay=document.createElement("div")
  $divOverlay.setAttribute("class","overlay")
  $divOverlay.setAttribute("id","overlay")

  var $divModal=document.createElement("div")
  $divModal.setAttribute("class","modal")
  $divOverlay.appendChild($divModal)

  var $h2=document.createElement("h2")
  $h2.setAttribute("class","modal-message")
  $h2.textContent="Are You Sure You Want To Delete?"
  $divModal.appendChild($h2)

  var $divModalIcons=document.createElement("div")
  $divModalIcons.setAttribute("class","modal-icons")
  $divModal.appendChild($divModalIcons)

  var $delete=document.createElement("i")
  $delete.setAttribute("class","fas fa-trash modal-icon")
  $delete.setAttribute("id","delete-confirm")
  $divModalIcons.appendChild($delete)

  var $undo=document.createElement("i")
  $undo.setAttribute("class","fas fa-undo modal-icon")
  $undo.setAttribute("id","undo")
  $divModalIcons.appendChild($undo)

  return $divOverlay
}
