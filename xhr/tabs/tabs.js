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

const anchors = document.getElementsByTagName('a');
const pressEmail = anchors[0];
const pressSms = anchors[1];

function showContent(event, request, removeActive, addActive) {
  if (event) {
    event.preventDefault();
  }

  removeActive.classList.remove("active");
  addActive.classList.add("active");

  request.open('GET', addActive.href);
  request.send();
}

showContent(null, emailRequest, pressSms, pressEmail);

pressEmail.addEventListener("click", () => {showContent(event, emailRequest, pressSms, pressEmail)});
pressSms.addEventListener("click", () => {showContent(event, smsRequest, pressEmail, pressSms)});
