import * as utils from './utilities.js';

const searchBar = document.querySelector(".SearchBar");

searchBar.addEventListener("keyup", utils.debounce(function(e) {
    utils.fetchSongs(searchBar.value, utils.drawSongs);
  }, utils.DEBOUNCE_WAIT)
);
