import {
  getParameterByName,
  fetchSong,
  drawSongDetail,
  debounce,
  DEBOUNCE_WAIT
} from './utilities.js';

const detailSearchBarTerm = document.querySelector(".DetailSearchBar");
const detailSearchBar = document.querySelector(".DetailSearchBar-icon");

if (window.location.pathname.match("song.html$")) {
  fetchSong(getParameterByName("q"), drawSongDetail);
}

if (detailSearchBar !== null) {
  detailSearchBar.addEventListener("click", debounce(function(e) {
      window.location.href = `/index.html?term=${detailSearchBarTerm.value}`;
    }, DEBOUNCE_WAIT)
  );
}
