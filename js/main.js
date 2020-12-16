var $dataViews=document.querySelectorAll("div[data-view]")

var $adviceButton=document.querySelector("#advice-button")
var $quoteButton=document.querySelector("#quote-button")
var $jokeButton=document.querySelector("#joke-button")
var $activityButton=document.querySelector("#activity-button")

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
  }
}

document.addEventListener("click",function(event){
  if (event.target===$adviceButton){
    swap("random-data")
    getAdvice()
  }
})

document.addEventListener("DOMContentLoaded", function(event){
  swap("home")
})
