import * as utils from './utilities.js';

const searchBar = document.querySelector(".SearchBar");
const searchResults = document.querySelector(".SearchResults-listItem");
let termParam = utils.getParameterByName("term");

if (searchBar !== null) {
  searchBar.addEventListener("keyup", utils.debounce(function(e) {
      utils.fetchSongs(searchBar.value, utils.drawSongs);
    }, utils.DEBOUNCE_WAIT)
  );
}

if (termParam !== null && termParam.length) {
  utils.fetchSongs(termParam, utils.drawSongs);
}
