import {
  getParameterByName,
  fetchSong,
  drawSongDetail,
  debounce,
  DEBOUNCE_WAIT
} from './utilities.js';

const detailSearchBar = document.querySelector(".DetailSearchBar");

if (window.location.pathname.match("song.html$")) {
  fetchSong(getParameterByName("q"), drawSongDetail);
}

if (detailSearchBar !== null) {
  detailSearchBar.addEventListener("keyup", debounce(function(e) {
      window.location.href = `/index.html?term=${detailSearchBar.value}`;
    }, DEBOUNCE_WAIT)
  );
}
