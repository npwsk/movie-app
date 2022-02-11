import API_KEY from './config.js';

const API_BASE = new URL('https://api.themoviedb.org');

const TRENDING_URL = new URL(`/3/trending/movie/day?api_key=${API_KEY}`, API_BASE);
const CONFIG_URL = new URL(`/3/configuration?api_key=${API_KEY}`, API_BASE);
const GENRE_LIST_URL = new URL(`/3/genre/movie/list?api_key=${API_KEY}&language=en-US`, API_BASE);
const POPULAR_LIST_URL = new URL(
  `/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`,
  API_BASE
);
const SEARCH_MOVIE_URL_BASE = new URL(
  `/3/search/movie?api_key=${API_KEY}&include_adult=false`,
  API_BASE
);

export default {
  TRENDING_URL,
  CONFIG_URL,
  GENRE_LIST_URL,
  POPULAR_LIST_URL,
  SEARCH_MOVIE_URL_BASE,
};
