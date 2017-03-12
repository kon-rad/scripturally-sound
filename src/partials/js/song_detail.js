import {
  getParameterByName,
  fetchSong,
  drawSongDetail
} from './utilities.js';

if (window.location.pathname.match("song.html$")) {
  fetchSong(getParameterByName("q"), drawSongDetail);
}
