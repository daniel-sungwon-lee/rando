const $main=document.querySelector("main")

const $dataViews=document.querySelectorAll("div[data-view]")
const $addButtons=document.querySelectorAll("#add-button")

const $favHeader=document.querySelector("a[data-view='favorites']")
const $adviceList=document.querySelector("#advices")
const $quoteList=document.querySelector("#quotes")
const $jokeList=document.querySelector("#jokes")
const $recipeList=document.querySelector("#recipes")

const $toDoHeader=document.querySelector("a[data-view='to-do']")
const $toDoList=document.querySelector("#to-do-list")

const userAddedList=JSON.parse(localStorage.getItem("addedList"))

function swap(view){
  if (view==="home"){
    for (let i =0;i<$dataViews.length;i++){
      if ($dataViews[i].getAttribute("data-view")===view){
        $dataViews[i].className=view
      }else{
        $dataViews[i].className="hidden"
      }
    }
  } else if (view==="random-data"){
    for (let i =0;i<$dataViews.length;i++){
      if ($dataViews[i].getAttribute("data-view")===view){
        $dataViews[i].className=view
      }else{
      $dataViews[i].className="hidden"
      }
    }

    $apiData.appendChild(renderSpinner())

  } else if (view==="favorites"){
    for (let i = 0; i < $dataViews.length; i++) {
      if ($dataViews[i].getAttribute("data-view") === view) {
        $dataViews[i].className = view
      } else {
        $dataViews[i].className = "hidden"
      }
    }
  } else if (view==="to-do"){
    for (let i = 0; i < $dataViews.length; i++) {
      if ($dataViews[i].getAttribute("data-view") === view) {
        $dataViews[i].className = view
      } else {
        $dataViews[i].className = "hidden"
      }
    }
  }
}

document.addEventListener("click",(event)=>{
  if (event.target.matches("#advice-button")){
    swap("random-data")
    getAdvice()

    for (let i = 0; i < $addButtons.length; i++) {
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

    for (let i =0;i<$addButtons.length;i++){
      if ($addButtons[i].matches("a[data-view='favorites']")){
        $addButtons[i].className="add-button landscape"
      }else {
        $addButtons[i].className="add-button hidden"
      }
    }

  } else if (event.target.matches("#joke-button")){
    swap("random-data")
    getDadJoke()

    for (let i = 0; i < $addButtons.length; i++) {
      if ($addButtons[i].matches("a[data-view='favorites']")) {
        $addButtons[i].className = "add-button landscape"
      } else {
        $addButtons[i].className = "add-button hidden"
      }
    }

  } else if (event.target.matches("#activity-button")){
    swap("random-data")
    getActivity()

    for (let i = 0; i < $addButtons.length; i++) {
      if ($addButtons[i].matches("a[data-view='to-do']")) {
        $addButtons[i].className = "add-button landscape"
      } else {
        $addButtons[i].className = "add-button hidden"
      }
    }

  } else if (event.target.matches("#recipe-button")){
    swap("random-data")
    getRecipe()

    for (let i = 0; i < $addButtons.length; i++) {
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
      const $h2 = document.querySelector("h2")
      if ($h2.getAttribute("id")==="advice"){
        $adviceList.firstElementChild.className="title"

        let content = new fav("advice")
        content.text=$h2.textContent

        $adviceList.appendChild(renderLi(content.text,content.author))

        addedList.favorites.push(content)
        localStorage.setItem("addedList",JSON.stringify(addedList))

      } else if ($h2.getAttribute("id")==="quote"){
        $quoteList.firstElementChild.className="title"

        let content=new fav("quote")
        content.text=$h2.textContent
        const $h3 = document.querySelector("#author")
        content.author= $h3.textContent

        $quoteList.appendChild(renderLi(content.text,content.author))

        addedList.favorites.push(content)
        localStorage.setItem("addedList",JSON.stringify(addedList))

      } else if ($h2.getAttribute("id")==="joke"){
        $jokeList.firstElementChild.className="title"

        let content = new fav("joke")
        content.text=$h2.textContent

        $jokeList.appendChild(renderLi(content.text,content.author))

        addedList.favorites.push(content)
        localStorage.setItem("addedList",JSON.stringify(addedList))

      } else if ($h2.getAttribute("id")==="recipe"){
        $recipeList.firstElementChild.className="title"

        let content = new fav("recipe")
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
      const $h2=document.querySelector("h2")
      if ($h2.getAttribute("id")==="activity"){
        let content=new todo("activity")
        content.text=$h2.textContent
        content.isComplete=false

        $toDoList.appendChild(renderCheckLi(content.text))

        addedList.toDos.push(content)
        localStorage.setItem("addedList",JSON.stringify(addedList))
      }
    }
  } else if (event.target.matches("#delete")){
    $main.appendChild(renderModal())
    const clickedList=event.target.closest("li")

    const $overlay=document.querySelector("#overlay")
    $overlay.addEventListener("click",(event)=>{
      if (event.target.matches("#delete-confirm")){
        const $favLists=document.querySelectorAll("#fav-li")
        const $checkLists=document.querySelectorAll("#check-li")

        for (let i =0;i<$favLists.length;i++){
          if (clickedList===$favLists[i]){
            let text=$favLists[i].getElementsByTagName("p")[0].textContent

            for (let i=0;i<addedList.favorites.length;i++){
              if (addedList.favorites[i].text===text){
                addedList.favorites.splice(i,1)
                localStorage.setItem("addedList",JSON.stringify(addedList))
              }
            }
          }
        }

        for (let i=0;i<$checkLists.length;i++){
          if (clickedList===$checkLists[i]){
            addedList.toDos.splice(i,1)
            localStorage.setItem("addedList",JSON.stringify(addedList))
          }
        }
        clickedList.remove()
        $overlay.remove()

        const $adviceLi = $adviceList.getElementsByTagName("li")
        const $quoteLi = $quoteList.getElementsByTagName("li")
        const $jokeLi = $jokeList.getElementsByTagName("li")
        const $recipeLi = $recipeList.getElementsByTagName("li")

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

        const $toDoLi=$toDoList.getElementsByTagName("li")

        if ($toDoLi.length===0){
          $toDoHeader.className="hidden"
          swap("home")
        }
      }
    })
  } else if (event.target.matches("#undo")){
    document.querySelector("#overlay").remove()

  } else if (event.target.matches("#reload")){
    const type=document.querySelector("#api-data").firstElementChild.getAttribute("id")

    if (type==="advice"){
      while (document.querySelector("#api-data").firstElementChild){
        document.querySelector("#api-data").firstElementChild.remove()
      }

      $apiData.appendChild(renderSpinner())
      getAdvice()

    } else if (type==="quote"){
      while (document.querySelector("#api-data").firstElementChild) {
        document.querySelector("#api-data").firstElementChild.remove()
      }

      $apiData.appendChild(renderSpinner())
      getFamousQuote()

    } else if (type==="joke"){
      while (document.querySelector("#api-data").firstElementChild) {
        document.querySelector("#api-data").firstElementChild.remove()
      }

      $apiData.appendChild(renderSpinner())
      getDadJoke()

    } else if (type==="activity"){
      while (document.querySelector("#api-data").firstElementChild) {
        document.querySelector("#api-data").firstElementChild.remove()
      }

      $apiData.appendChild(renderSpinner())
      getActivity()

    } else if (type==="recipe"){
      while(document.querySelector("#api-data").firstElementChild){
        document.querySelector("#api-data").firstElementChild.remove()
      }

      $apiData.appendChild(renderSpinner())
      getRecipe()
    }
  }
})

document.addEventListener("DOMContentLoaded",(event)=>{
  if (userAddedList!==null){
    addedList=userAddedList
    swap("home")

    for (let i=0;i<userAddedList.favorites.length;i++){
      if (userAddedList.favorites[i].type==="advice"){
        const text=userAddedList.favorites[i].text
        const author=userAddedList.favorites[i].author
        $adviceList.appendChild(renderLi(text,author))

      } else if (userAddedList.favorites[i].type==="quote"){
        const text = userAddedList.favorites[i].text
        const author = userAddedList.favorites[i].author
        $quoteList.appendChild(renderLi(text, author))

      } else if (userAddedList.favorites[i].type==="joke"){
        const text = userAddedList.favorites[i].text
        const author = userAddedList.favorites[i].author
        $jokeList.appendChild(renderLi(text, author))

      } else if (userAddedList.favorites[i].type==="recipe"){
        const text=userAddedList.favorites[i].text
        const url=userAddedList.favorites[i].url
        $recipeList.appendChild(renderRecipeLi(text,url))
      }
    }

    for (let i=0;i<userAddedList.toDos.length;i++){
      const text = userAddedList.toDos[i].text
      $toDoList.appendChild(renderCheckLi(text))
    }

    const $checkbox=document.querySelectorAll(".checkbox")
    for (let i =0;i<$checkbox.length;i++){
      $checkbox[i].checked=userAddedList.toDos[i].isComplete
    }
  }

  const $adviceLi = $adviceList.getElementsByTagName("li")
  const $quoteLi = $quoteList.getElementsByTagName("li")
  const $jokeLi = $jokeList.getElementsByTagName("li")
  const $recipeLi = $recipeList.getElementsByTagName("li")

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

  const $toDoLi=$toDoList.getElementsByTagName("li")

  if ($toDoLi.length>0){
    $toDoHeader.className="header narrow"
  }

  swap("home")
})

$toDoList.addEventListener("change",(event)=>{
  const todoText=event.target.getAttribute("id")
  for (let i=0;i<addedList.toDos.length;i++){
    if (addedList.toDos[i].text===todoText){
      addedList.toDos[i].isComplete=event.target.checked
      localStorage.setItem("addedList",JSON.stringify(addedList))
    }
  }
})

function renderLi (text,author){
  const $li = document.createElement("li")
  $li.setAttribute("id","fav-li")

  const $pDiv=document.createElement("div")
  $li.appendChild($pDiv)

  const $pText=document.createElement("p")
  $pText.textContent=text
  $pDiv.appendChild($pText)

  const $pAuthor=document.createElement("p")
  $pAuthor.textContent=author
  $pDiv.appendChild($pAuthor)

  const $delDiv = document.createElement("div")
  $delDiv.setAttribute("class", "del-div")
  $li.appendChild($delDiv)

  const $delete=document.createElement("i")
  $delete.setAttribute("class","fas fa-trash")
  $delete.setAttribute("id","delete")
  $delDiv.appendChild($delete)

  return $li
}

function renderCheckLi (text){
  const $li = document.createElement("li")
  $li.setAttribute("class","check-li")
  $li.setAttribute("id","check-li")

  const $divLi=document.createElement("div")
  $divLi.setAttribute("class","div-li")
  $li.appendChild($divLi)

  const $checkbox=document.createElement("input")
  $checkbox.setAttribute("type","checkbox")
  $checkbox.setAttribute("id",text)
  $checkbox.setAttribute("class","checkbox")
  $divLi.appendChild($checkbox)

  const $label=document.createElement("label")
  $label.setAttribute("for",text)
  $label.setAttribute("class","label")
  $label.textContent=text
  $divLi.appendChild($label)

  const $delDiv=document.createElement("div")
  $delDiv.setAttribute("class","del-div")
  $li.appendChild($delDiv)

  const $delete=document.createElement("i")
  $delete.setAttribute("class","fas fa-trash")
  $delete.setAttribute("id","delete")
  $delDiv.appendChild($delete)

  return $li
}

function renderRecipeLi (text,url){
  const $li = document.createElement("li")
  $li.setAttribute("id", "fav-li")

  const $linkDiv = document.createElement("div")
  $li.appendChild($linkDiv)

  const $link = document.createElement("a")
  $link.setAttribute("target","_blank")
  $link.setAttribute("class","recipe")
  $link.setAttribute("href",url)
  $linkDiv.appendChild($link)

  const $pText = document.createElement("p")
  $pText.textContent = text
  $link.appendChild($pText)

  const $delDiv = document.createElement("div")
  $delDiv.setAttribute("class", "del-div")
  $li.appendChild($delDiv)

  const $delete = document.createElement("i")
  $delete.setAttribute("class", "fas fa-trash")
  $delete.setAttribute("id", "delete")
  $delDiv.appendChild($delete)

  return $li
}

function renderModal(){
  const $divOverlay=document.createElement("div")
  $divOverlay.setAttribute("class","overlay")
  $divOverlay.setAttribute("id","overlay")

  const $divModal=document.createElement("div")
  $divModal.setAttribute("class","modal")
  $divOverlay.appendChild($divModal)

  const $h2=document.createElement("h2")
  $h2.setAttribute("class","modal-message")
  $h2.textContent="Are You Sure You Want To Delete?"
  $divModal.appendChild($h2)

  const $divModalIcons=document.createElement("div")
  $divModalIcons.setAttribute("class","modal-icons")
  $divModal.appendChild($divModalIcons)

  const $delete=document.createElement("i")
  $delete.setAttribute("class","fas fa-trash modal-icon")
  $delete.setAttribute("id","delete-confirm")
  $divModalIcons.appendChild($delete)

  const $undo=document.createElement("i")
  $undo.setAttribute("class","fas fa-undo modal-icon")
  $undo.setAttribute("id","undo")
  $divModalIcons.appendChild($undo)

  return $divOverlay
}

function renderSpinner(){
  const $spinner=document.createElement("div")
  $spinner.className="spinner"

  const $bounce1 = document.createElement("div")
  $bounce1.className="bounce1"
  $spinner.appendChild($bounce1)

  const $bounce2=document.createElement("div")
  $bounce2.className="bounce2"
  $spinner.appendChild($bounce2)

  const $bounce3=document.createElement("div")
  $bounce3.className="bounce3"
  $spinner.appendChild($bounce3)

  return $spinner
}
