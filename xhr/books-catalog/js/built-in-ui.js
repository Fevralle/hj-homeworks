/* Данный JS код */

// Регулируем видимость карточки
function toggleCardVisible () {
 document.getElementById('content').classList.toggle('hidden');
 document.getElementById('card').classList.toggle('hidden');
}


document.getElementById('close').addEventListener('click', toggleCardVisible);

document.getElementById('content').addEventListener('click', (event) => {
    let target = null;
    if (event.target.tagName === 'LI') {
        target = event.target;
    }
    if (event.target.parentNode.tagName === 'LI') {
        target = event.target.parentNode;
    }

    if (target) {
      toggleCardVisible();
      document.getElementById('card-title').innerHTML = target.dataset.title;
      document.getElementById('card-author').innerHTML = target.dataset.author;
      document.getElementById('card-info').innerHTML = target.dataset.info;
      document.getElementById('card-price').innerHTML = target.dataset.price;
    }
});

const list = document.getElementById('content');

const catalog = new XMLHttpRequest();
catalog.open('GET', 'https://netology-fbb-store-api.herokuapp.com/book'); //'https://netology-fbb-store-api.herokuapp.com/book/
catalog.send();

catalog.addEventListener("load", onLoadContent);

let books, newLi;

function onLoadContent() {
  if (this.status === 200) {
    books = JSON.parse(this.responseText);

    books.forEach(v => {
      newLi = document.createElement("li");

      // что-то туго с деструктуризацией: не могу додуматься, как добраться до info и autor, потому что это все информация из вложенных объектов вложенных объектов...
      const {title, price} = v;

      for (let prop in {title, price}) {
        newLi.dataset[prop] = {title, price}[prop];
      }

      //newLi.dataset.title = v.title;
      //newLi.dataset.author = v.author.name;
      //newLi.dataset.info = v.reviews[0].cite;
      //newLi.dataset.price= v.price;
      newLi.innerHTML = `<img src="${v.cover.small}">`;

      list.appendChild(newLi);
    });
  } else {
    list.innerHTML = `<li>Ответ ${this.status}: ${this.statusText}</li>`;
  }
}
