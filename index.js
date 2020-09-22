// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('menu');
const navBar = document.getElementById('navBar');

const menuURL = 'https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json ';

let promise = (url) => {
  return new Promise((resolve,reject)=>{
    let req = new XMLHttpRequest();
    req.open("GET", url);
    req.onload = () => {
      if(req.status === 200){
        resolve(JSON.parse(req.response));
      }else{
        console-log("Error")
        reject(req.statusText);
      }
    }
  });
}

navBar.addEventListener("click", (evt)=>{
  const tipo=evt.target.id;
  console.log(tipo);
});

promise(menuURL).then(menu=>{
  let lista = new Array();
  for(i = 0; i<menu.length;i++){

  }
  appDiv.innerHTML = `<h1>JS Starter</h1>`;
});

