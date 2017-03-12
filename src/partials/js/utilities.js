export const API_ENDPOINT = "http://c4tk.somamou.org/songs.json";
export const API_SONG_ENDPOINT = API_ENDPOINT.slice(0, -5);
export const QUERY_KEY = "?q=";
export const DEBOUNCE_WAIT = 300;
const SEARCH_RESULTS_LIST = ".SearchResults-list";
const SEARCH_RESULTS_INFO = ".SearchResults-info";
var resultsList = document.querySelector(`${SEARCH_RESULTS_LIST}`);
var resultsInfo = document.querySelector(`${SEARCH_RESULTS_INFO}`);
var docFrag = null;

export var debounce = function (func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

export function getParameterByName(name, url) {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export function fetchSongs(query, callback) {
  let endPoint = `${API_ENDPOINT}${QUERY_KEY}${query}`;

  if (query === "") {
    resetResults();
  } else {
    axios.get(endPoint)
      .then(function (response) {
        if(response.data.length) {
          callback(response.data, query);
        } else {
          drawNoResultsInfo(query);
        }
      })
      // .catch(function (error) {
      //   console.log(error);
      // })
    ;
  }
}

export function fetchSong(id, callback) {
  let endPoint = `${API_SONG_ENDPOINT}/${id}.json`;

  if (typeof id !== "undefined") {
    axios.get(endPoint)
      .then(function (response) {
        callback(response.data);
      });
      // .catch(function (error) {
      //   console.log(error);
      // })
  }
}

export function drawSongDetail({ lyrics, video_url, title, artist, general_references }) {
  let video = document.querySelector(".DetailVideo");

  if (video_url !== null) {
    video.setAttribute("src", video_url);
  } else {
    video.style.display = "none";
  }
    
  if (general_references !== null ) {
    document.querySelector(".DetailContent-verses").innerHTML = createVerseHTML(general_references);
  }

  if (lyrics !== null) {
    let lyrics_with_title = `<p><strong>Lyrics</strong></p>${lyrics}`;
    document.querySelector(".DetailContent-lyrics").innerHTML = lyrics_with_title;
  }

  document.querySelector(".DetailContent-title").innerHTML = title;
  document.querySelector(".DetailContent-artist").innerHTML = artist;
}

function createVerseHTML(verseArray) {
  let htmlString = "";

  verseArray.forEach(function(verse) {
    if (verse.verse_text.length) {
      htmlString += `<p><strong>${verse.verse_reference}</strong><p>${verse.verse_text}</p>`;
    }
  });

  return htmlString;
}

export function drawSongs(songs, query) {
  docFrag = document.createDocumentFragment();

  drawResultsInfo(query);

  if (songs.constructor === Array) {
    songs.forEach(pushToSongsList);
  } else {
    pushToSongsList(songs);
  }
  resultsList.appendChild(docFrag);
  docFrag = null;
}

export function pushToSongsList({ id, title, artist }) {
  let tempDiv = document.createElement('div');
  
  tempDiv.innerHTML = `<li class="SearchResults-listItem u-fadein" data-song-id="${id}"><a href="/song.html?q=${id}" class="SearchResults-listLink">${title} - ${artist}</a></li>`;
  docFrag.appendChild(tempDiv.firstChild);
}

function drawResultsInfo(query) {
  let resultsInfo = document.querySelector(`${SEARCH_RESULTS_INFO}`);

  resultsList.innerHTML = "";
  resultsInfo.innerHTML = `search results for: \"${query}\"`;
}

function drawNoResultsInfo(query) {
  resultsList.innerHTML = "";
  resultsInfo.innerHTML = `0 search results for: \"${query}\"`;
}

function resetResults() {
  resultsList.innerHTML = "";
  resultsInfo.innerHTML = "";
}

