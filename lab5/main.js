// 1. Поміняйте місцями тексти, позначені «1» та «6».
function changeOneAndSix(){
    let firstText = document.querySelector("#first_text");
    let sixthText = document.querySelector("#sixth_text");
    let currText = firstText.innerHTML;
    firstText.innerHTML = sixthText.innerHTML;
    sixthText.innerHTML = currText;
}

setTimeout(changeOneAndSix, 2000);

// 2. Напишіть функцію, яка обчислює площу ромба,
// беручи необхідні значення із відповідних змінних у
// скрипті, і виводить отриманий результат в кінці
// контенту в блоці «3».

function findArea(a, h){
    let third = document.querySelector("#content");
    third.innerHTML = `Сторона:${a} Висота:${h} Площа:${a*h}`
}

findArea(10, 3);

// 3. Напишіть скрипт, який визначає можливість
// побудови трикутника із заданими довжинами
// сторін, беручи необхідні значення із відповідної
// форми в блоці «3», а отриманий результат виводить
// за допомогою діалогового вікна і зберігає в cookies,
// причому:
// а) при оновленні веб-сторінки в броузері користувачу за допомогою
// діалогового вікна виводиться інформація, збережена в cookies, із питанням про
// необхідність видалити дані із cookies, і не виводиться згадана вище форма;
// б) при підтвердженні питання відповідні cookies видаляються, і веб-сторінка
// оновлюється з початковим станом із наявною формою для введення даних;
// в) при відмові виводиться наступне діалогове вікно із інформуванням
// користувача про наявність cookies і потребу перезавантажити веб-сторінку.

function isTriangle(a, b, c){
    if(a+b>c && a+c>b && b+c>a && a>0 && b>0 && c>0){
        return "triangle";
    }
    else return "notTriangle";
}

function formResult(e){
    e.preventDefault();
    let A = document.querySelector("#A");
    let B = document.querySelector("#B");
    let C = document.querySelector("#C");
    let p = document.createElement("p");
    document.cookie = `result=${isTriangle(parseInt(A.value), parseInt(B.value), parseInt(C.value))};`;
    let checkBox = document.querySelector("#cursive");
    if(checkBox.checked==1){
      checkBoxResult =1;
    }
    else {
      checkBoxResult = 0;
    }
    
  }
function showCookies() {
    alert(document.cookie);
  }

function deleteCookies(){
    document.cookie = "result=;";
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

let button = document.querySelector("button");
button.addEventListener("click", formResult);


if(getCookie("result")!=""){
    if (confirm('There are some cookie files, do You want to delete them?'+` ${document.cookie}`)) {
        deleteCookies();
        alert("Things are done, no cookies here.")
      } else {
        // Do nothing!
        alert('There are some cookie files, You need to reload the page!');
        //document.location.reload(true);
        let three = document.querySelector("#three");
        let form = three.querySelector("form");
        three.removeChild(form);
      }
    
    
}


// 4. Напишіть скрипт, який при настанні події mouseover встановлює властивість
// «курсив» для всього тексту в блоці «2» при встановленні користувачем
// відповідної радіокнопки у формі і зберігає відповідне значення «курсивності»

// тексту в localStorage броузера так, щоб при наступному відкриванні веб-
// сторінки значення «курсивності» тексту в блоці «2» встановлювалось із

// збереженого значення в localStorage.

let two = document.querySelector("#two");

function mouseOver(e){
  if(!e.relatedTarget || !e.relatedTarget.closest("#two")){

  if(two.style.fontStyle == "italic"){
    two.style.fontStyle ="normal";
  }
  else{
    two.style.fontStyle = "italic";
  }
  }
}
two.addEventListener("mouseover", mouseOver);
let checkBoxResult = 0;
function saveToLocalStorage(e){
  if(checkBoxResult == 1){
    localStorage.setItem("cursive", two.style.fontStyle);
  }
}
window.addEventListener("beforeunload", saveToLocalStorage);

if(localStorage.getItem("cursive")){
  console.log(localStorage.getItem("cursive"));
  two.style.fontStyle = localStorage.getItem("cursive")
}
// 5. Напишіть скрипт створення нумерованого списку:
// а) необхідні елементи форми появляються у відповідних номерних блоках (1..6)
// внаслідок кліку на текстовому посиланні в блоці;
// б) кількість пунктів нумерованого списку необмежена, парні і непарні пункти
// відрізняються кольорами тексту і фону («зебра», напр. «білий+чорний»/
// «чорний+білий»);
// в) поруч розміщується кнопка, внаслідок натискання на яку внесені дані
// нумерованого списку зберігаються в localStorage броузера (структуровано на
// ваш розсуд);
// г) перезавантаження веб-сторінки призводить до демонстрації списку на місці
// початкового вмісту номерного блока.


function docClick(e){
  if(e.target.closest("#m")){
    localStorage.clear();
  }
  if(e.target.classList.contains("ulform")){
    let element = e.target;
    let block = element.parentElement;
    block.innerHTML+=`<div><label for="list">List:</label><br>
    <textarea cols="30" rows="4"></textarea>
    <button class="saving">Save</button></div>`;
    let del = block.querySelector(".ulform");
    del.remove();
    let button = block.querySelector(".saving");
    button.addEventListener("click", saveInfo);
  }
  
function saveInfo(e){
  let block = e.target.parentElement;
  let text = block.querySelector("textarea").value;
  let new_text ="";
  if(localStorage.getItem(`ul_${block.parentElement.id}`)){
    new_text+=localStorage.getItem(`ul_${block.parentElement.id}`)
    new_text+="\n";
  }

  new_text+=text;
  
  localStorage.setItem(`ul_${block.parentElement.id}`, new_text);

  let big_div = block.parentElement;
  block.remove();
  big_div.innerHTML+=`<span class="ulform">open form</span>`;
}
}
document.addEventListener("click", docClick);

if(localStorage.getItem("ul_one")){
  let text = localStorage.getItem("ul_one");
  let strings = text.split("\n");
  let block = document.querySelector("#one");
  block.innerHTML+=`<ul class="unlist"></ul>`;
  let ul = block.querySelector("ul");
  for(let i =0; i<strings.length; i++){
    ul.innerHTML+=`<li>${strings[i]}</li>`
  }

}

if(localStorage.getItem("ul_two")){
  let text = localStorage.getItem("ul_two");
  let strings = text.split("\n");
  let block = document.querySelector("#two");
  block.innerHTML+=`<ul class="unlist"></ul>`;
  let ul = block.querySelector("ul");
  for(let i =0; i<strings.length; i++){
    ul.innerHTML+=`<li>${strings[i]}</li>`
  }

}
if(localStorage.getItem("ul_three")){
  let text = localStorage.getItem("ul_three");
  let strings = text.split("\n");
  let block = document.querySelector("#three");
  block.innerHTML+=`<ul class="unlist"></ul>`;
  let ul = block.querySelector("ul");
  for(let i =0; i<strings.length; i++){
    ul.innerHTML+=`<li>${strings[i]}</li>`
  }

}

if(localStorage.getItem("ul_four")){
  let text = localStorage.getItem("ul_four");
  let strings = text.split("\n");
  let block = document.querySelector("#four");
  block.innerHTML+=`<ul class="unlist"></ul>`;
  let ul = block.querySelector("ul");
  for(let i =0; i<strings.length; i++){
    ul.innerHTML+=`<li>${strings[i]}</li>`
  }

}

if(localStorage.getItem("ul_five")){
  let text = localStorage.getItem("ul_five");
  let strings = text.split("\n");
  let block = document.querySelector("#five");
  block.innerHTML+=`<ul class="unlist"></ul>`;
  let ul = block.querySelector("ul");
  for(let i =0; i<strings.length; i++){
    ul.innerHTML+=`<li>${strings[i]}</li>`
  }

}

if(localStorage.getItem("ul_six")){
  let text = localStorage.getItem("ul_six");
  let strings = text.split("\n");
  let block = document.querySelector("#six");
  block.innerHTML+=`<ul class="unlist"></ul>`;
  let ul = block.querySelector("ul");
  for(let i =0; i<strings.length; i++){
    ul.innerHTML+=`<li>${strings[i]}</li>`
  }

}

