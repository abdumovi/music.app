let btn = document.querySelector('.btn');
let input = document.querySelector('.form-control');
let other = document.querySelector('.music');
let modal = document.querySelector('.modal__all');
btn.addEventListener('click', function () {
  let search = input.value.toLowerCase();
  input.value = "";
  fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${search}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      "x-rapidapi-key": "ff1d1c0005msh81f210c67c50623p1c3f37jsn342ede10661b"
    }
  })
    .then(response => response.json())
    .then(data => render(data.data))
    .catch(err => {
      console.error(err);
    });
});
function render(data) {
  other.innerHTML = "";
  if (data) {
    for (let i of data) {
      let li = document.createElement('li');
      li.className = 'col-md-3 music__item';
      li.innerHTML = `
        <div class="music__artist">
          <span class="music__orign"></span>
          <img  src="${i.artist.picture_big}" alt="img">
        </div>
        <div class="music__img">
          <img src="${i.album.cover_big}" alt="img">
        </div>
        <div class="music__block">
          <audio class="music__audio" controls src="${i.preview}"></audio>
        </div>
        <div class="music__names">
          <p class="music__name">${i.title_short}</p>
          <a class="music__link" target="_blank" href="${i.link}">link</a>
        </div>`
      other.append(li);
    }
  }
  else{
    modal.classList.add('mod-block');
  }
}
