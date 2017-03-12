import * as utils from './utilities.js';

const searchBar = document.querySelector(".SearchBar");
const searchResults = document.querySelector(".SearchResults-listItem");
 
if (searchBar !== null) {
  searchBar.addEventListener("keyup", utils.debounce(function(e) {
      utils.fetchSongs(searchBar.value, utils.drawSongs);
    }, utils.DEBOUNCE_WAIT)
  );
}
