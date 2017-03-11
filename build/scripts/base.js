"use strict";

(function () {
  "use strict";

  var $$utilities$$ = {
    get API_ENDPOINT() {
      return $$utilities$$API_ENDPOINT;
    },

    get QUERY_KEY() {
      return $$utilities$$QUERY_KEY;
    },

    get DEBOUNCE_WAIT() {
      return $$utilities$$DEBOUNCE_WAIT;
    },

    get debounce() {
      return $$utilities$$debounce;
    },

    get fetchSongs() {
      return $$utilities$$fetchSongs;
    },

    get drawSongs() {
      return $$utilities$$drawSongs;
    },

    get pushToSongsList() {
      return $$utilities$$pushToSongsList;
    }
  };

  var $$utilities$$API_ENDPOINT = "http://c4tk.somamou.org/songs.json";
  var $$utilities$$QUERY_KEY = "?q=";
  var $$utilities$$DEBOUNCE_WAIT = 300;
  var $$utilities$$SEARCH_RESULTS_LIST = ".SearchResults-list";
  var $$utilities$$SEARCH_RESULTS_INFO = ".SearchResults-info";
  var $$utilities$$docFrag = null;

  var $$utilities$$debounce = function $$utilities$$debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this,
          args = arguments;
      var later = function later() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  function $$utilities$$fetchSongs(query, callback) {
    var endPoint = "" + $$utilities$$API_ENDPOINT + $$utilities$$QUERY_KEY + query;

    axios.get(endPoint).then(function (response) {
      if (response.data.length) callback(response.data, query);
    })
    // .catch(function (error) {
    //   console.log(error);
    // })
    ;
  }

  function $$utilities$$drawSongs(songs, query) {
    $$utilities$$docFrag = document.createDocumentFragment();

    $$utilities$$drawResultsInfo(query);

    if (songs.constructor === Array) {
      songs.forEach($$utilities$$pushToSongsList);
    } else {
      $$utilities$$pushToSongsList(songs);
    }
    document.querySelector("" + $$utilities$$SEARCH_RESULTS_LIST).appendChild($$utilities$$docFrag);
    $$utilities$$docFrag = null;
  }

  function $$utilities$$pushToSongsList(_ref) {
    var id = _ref.id,
        title = _ref.title,
        artist = _ref.artist;

    var tempDiv = document.createElement('div');

    tempDiv.innerHTML = "<li data-song-id=\"" + id + "\">\n      " + title + ", " + artist + " </li>";
    $$utilities$$docFrag.appendChild(tempDiv.firstChild);
  }

  function $$utilities$$drawResultsInfo(query) {
    var resultsInfo = document.querySelector("" + $$utilities$$SEARCH_RESULTS_INFO);

    resultsInfo.innerHTML = "\"" + query + "\" RESULTS";
  }

  var src$partials$js$search_bar$$searchBar = document.querySelector(".SearchBar");

  src$partials$js$search_bar$$searchBar.addEventListener("keyup", $$utilities$$.debounce(function (e) {
    $$utilities$$.fetchSongs(src$partials$js$search_bar$$searchBar.value, $$utilities$$.drawSongs);
  }, $$utilities$$.DEBOUNCE_WAIT));
}).call(undefined);
"use strict";

(function () {
    "use strict";

    function src$partials$js$song_detail$$songDetail() {
        console.log("song detail");
    }
}).call(undefined);
"use strict";

(function () {
  "use strict";

  var src$partials$js$utilities$$API_ENDPOINT = "http://c4tk.somamou.org/songs.json";
  var src$partials$js$utilities$$QUERY_KEY = "?q=";
  var src$partials$js$utilities$$DEBOUNCE_WAIT = 300;
  var src$partials$js$utilities$$SEARCH_RESULTS_LIST = ".SearchResults-list";
  var src$partials$js$utilities$$SEARCH_RESULTS_INFO = ".SearchResults-info";
  var src$partials$js$utilities$$docFrag = null;

  var src$partials$js$utilities$$debounce = function src$partials$js$utilities$$debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this,
          args = arguments;
      var later = function later() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  function src$partials$js$utilities$$fetchSongs(query, callback) {
    var endPoint = "" + src$partials$js$utilities$$API_ENDPOINT + src$partials$js$utilities$$QUERY_KEY + query;

    axios.get(endPoint).then(function (response) {
      if (response.data.length) callback(response.data, query);
    })
    // .catch(function (error) {
    //   console.log(error);
    // })
    ;
  }

  function src$partials$js$utilities$$drawSongs(songs, query) {
    src$partials$js$utilities$$docFrag = document.createDocumentFragment();

    src$partials$js$utilities$$drawResultsInfo(query);

    if (songs.constructor === Array) {
      songs.forEach(src$partials$js$utilities$$pushToSongsList);
    } else {
      src$partials$js$utilities$$pushToSongsList(songs);
    }
    document.querySelector("" + src$partials$js$utilities$$SEARCH_RESULTS_LIST).appendChild(src$partials$js$utilities$$docFrag);
    src$partials$js$utilities$$docFrag = null;
  }

  function src$partials$js$utilities$$pushToSongsList(_ref) {
    var id = _ref.id,
        title = _ref.title,
        artist = _ref.artist;

    var tempDiv = document.createElement('div');

    tempDiv.innerHTML = "<li data-song-id=\"" + id + "\">\n      " + title + ", " + artist + " </li>";
    src$partials$js$utilities$$docFrag.appendChild(tempDiv.firstChild);
  }

  function src$partials$js$utilities$$drawResultsInfo(query) {
    var resultsInfo = document.querySelector("" + src$partials$js$utilities$$SEARCH_RESULTS_INFO);

    resultsInfo.innerHTML = "\"" + query + "\" RESULTS";
  }
}).call(undefined);