// Import stylesheets
import './style.css';

// Write Javascript code!
const menuDiv = document.getElementById('menu');
const tipoDiv = document.getElementById('tipo');
const navBar = document.getElementById('navBar');
const carMenu = document.getElementById('carMenu');
const carIcon = document.getElementById('car');
const cont = document.getElementById('cont');
const modal = document.getElementById('exampleModal');

const menuURL = 'https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json';

let menu = null;
let car=[];
let tipo = "";
let productos = new Array();

let promise = new Promise((resolve,reject)=> {
  
    let req = new XMLHttpRequest();
    req.open("GET", menuURL);
    req.onload = () => {
      if(req.status === 200){
        resolve(JSON.parse(req.response));
      }else{
        console-log("Error");
        reject(req.statusText);
      }
    }
    req.send();
});
promise.then(response => menu=response).catch(error => console.log(error));


navBar.addEventListener("click", (evt)=>{
  carMenu.innerHTML="";
  tipo=evt.target.id;
  tipoDiv.innerHTML = tipo;
  if(tipo==="Burgers"){
    productos=menu[0].products;
  }
  else if(tipo==="Tacos"){
    productos=menu[1].products;
  }
  else if(tipo==="Salads"){
    productos=menu[2].products;
  }
  else if(tipo==="Desserts"){
    productos=menu[3].products;
  }
  else if(tipo==="Drink & Sides"){
    productos=menu[4].products;
  }
  let prod = "<div class=\"row\">";
  for(let i=0; i<productos.length; i++){
    let a=productos[i];
        prod+="<div class=\"card col-3\" style=\"width: 18rem;\"><img src=\""+a.image+"\" class=\"card-img-top\" alt=\""+a.name+"\"><div class=\"card-body\"><h5 class=\card-title\">"+a.name+"</h5><p class=\"card-text\"><div>"+a.description+"<br><br><p style=\"font-weight:bold\";>$"+a.price+"</p></div></p><a id=\""+a.name+"|"+a.price+"\" class=\"btn btn-dark negro\" style=\"color:white\";>Go somewhere</a></div></div>";
  }
  menuDiv.innerHTML = prod;
});

menuDiv.addEventListener("click",(evt)=>{
  let info = evt.target.id;
  let valores = info.split("|");
  let repetido=false;
  if(valores.length===2){
    for(let i=0; i<car.length;i++){
      if(car[i].description === valores[0]){
        car[i].quantity++;
        repetido=true;
      }
    }
    if(!repetido){
      car[car.length]={'item':car.length+1, 'quantity': 1, 'description':valores[0], 'unitPrice':valores[1]};
    }
    cont.innerHTML=car.length +" items";
  }
});

carIcon.addEventListener("click",(evt)=>{
  menuDiv.innerHTML=null;
  tipoDiv.innerHTML = "Order detail";
  let total=0;
  let tabla = "<table class=\"table table-striped\"><thead><tr><th scope=\"col\">Item</th><th scope=\"col\">Qty.</th><th scope=\"col\">Description</th><th scope=\"col\">UnitPrice</th><th scope=\"col\">Amount</th></tr></thead><tbody>";
  for(let i=0; i<car.length;i++){
    let a=car[i];
    total+=a.quantity*a.unitPrice;
    tabla+="<tr><th scope=\"row\">"+a.item+"</th><td>"+a.quantity+"</td><td>"+a.description+"</td><td>"+a.unitPrice+"</td><td>"+(parseFloat(a.quantity*a.unitPrice).toFixed(2))+"</td></tr>"
  }
  tabla+="<tbody></table><div class=\"row\"><p style=\"font-weight:bold\"; class=\"col-9\">Total: $"+total+"</p><button type=\"button\" class=\"btn cancelar\" id=\"cancelar\" data-toggle=\"modal\" data-target=\"#exampleModal\">Cancel</button></h3><button type=\"button\" class=\"btn aceptar\" id=\"aceptar\">Confirm order</button></div>";
  total+=parseFloat(total).toFixed(2);
  carMenu.innerHTML = tabla;
});

carMenu.addEventListener("click",(evt)=>{
  if(evt.target.type === "button"){
    if(evt.target.id === "aceptar"){
      console.log(car);
      car=[];
      cont.innerHTML=car.length +" items";
      let tabla = "<table class=\"table table-striped\"><thead><tr><th scope=\"col\">Item</th><th scope=\"col\">Qty.</th><th scope=\"col\">Description</th><th scope=\"col\">UnitPrice</th><th scope=\"col\">Amount</th></tr></thead><tbody>";
      tabla+="<tbody></table><div class=\"row\"><p style=\"font-weight:bold\"; class=\"col-9\">Total: $"+0+"</p><button type=\"button\" class=\"btn cancelar\" id=\"cancelar\" data-toggle=\"modal\" data-target=\"#exampleModal\">Cancel</button></h3><button type=\"button\" class=\"btn aceptar\" id=\"aceptar\">Confirm order</button></div>";
      carMenu.innerHTML = tabla;
    }else{
      modal.style = "padding-right: 17px; display: block";
      modal.className = "modal fade show";
      modal.role = "dialog";
    }
  }
});

modal.addEventListener("click", (evt)=>{
  if(evt.target.type === "button"){
    if(evt.target.id === "aceptar"){
      car=[];
      cont.innerHTML=car.length +" items";
      let tabla = "<table class=\"table table-striped\"><thead><tr><th scope=\"col\">Item</th><th scope=\"col\">Qty.</th><th scope=\"col\">Description</th><th scope=\"col\">UnitPrice</th><th scope=\"col\">Amount</th></tr></thead><tbody>";
      tabla+="<tbody></table><div class=\"row\"><p style=\"font-weight:bold\"; class=\"col-9\">Total: $"+0+"</p><button type=\"button\" class=\"btn cancelar\" id=\"cancelar\" data-toggle=\"modal\" data-target=\"#exampleModal\">Cancel</button></h3><button type=\"button\" class=\"btn aceptar\" id=\"aceptar\">Confirm order</button></div>";
      carMenu.innerHTML = tabla;
    }
    modal.style = "display: none";
      modal.className = "modal fade";
      modal.role = null;
  }else if(evt.target.id === "cerrar"){
    modal.style = "display: none";
      modal.className = "modal fade";
      modal.role = null;
  }
})


