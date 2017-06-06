const emailRequest = new XMLHttpRequest();
const smsRequest = new XMLHttpRequest();

const preloader = document.getElementById('preloader');

function onLoadStart() {
  preloader.classList.remove("hidden");
}

function onLoadEnd() {
  preloader.classList.add("hidden");
}

const content = document.getElementById('content');

function onLoadContent() {
  if (this.status === 200) {
    content.innerHTML = `${this.responseText}`;
  } else {
    content.innerHTML = `<p>Ответ ${this.status}: ${this.statusText}</p>`;
  }
}

[emailRequest, smsRequest].forEach(v => {
  v.addEventListener("loadstart", onLoadStart);
  v.addEventListener("loadend", onLoadEnd);
  v.addEventListener("load", onLoadContent);
});

const anchors = Array.from(document.getElementsByTagName('a'));
const pressEmail = anchors[0];
const pressSms = anchors[1];

function showContent(event = null) {
  anchors.forEach(v => v.classList.remove("active"));
  let target;
  
  if (event) {
    event.preventDefault();
    target = event.target;
  } else {
    target = pressEmail;
  }

  target.classList.add("active");

  const request = new XMLHttpRequest();
  request.addEventListener("loadstart", onLoadStart);
  request.addEventListener("loadend", onLoadEnd);
  request.addEventListener("load", onLoadContent);
  request.open('GET', target.href);
  request.send();
}

showContent();

pressEmail.addEventListener("click", () => showContent(event));
pressSms.addEventListener("click", () => showContent(event));
