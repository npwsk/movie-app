import constants from './constants.js';
import renderCards from './render.js';
import getData from './getData.js';
import getAuxillaryData from './preload.js';
// import handleFormSubmit from './controllers.js';

const { imageBaseUrl, genres } = await getAuxillaryData();

const containerElem = document.querySelector('.main__movies-container');
const searchFormElem = document.querySelector('.header__search-form');
// const searchBtn = searchFormElem.querySelector('.search-form__submit');

const trendingMovies = await getData(constants.TRENDING_URL);
renderCards(containerElem, trendingMovies, imageBaseUrl);

const handleFormSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const userInput = formData.get('user-input');
  console.log(formData);
  const resultData = await getData(`${constants.SEARCH_MOVIE_URL_BASE}&query=${userInput}`);
  renderCards(containerElem, resultData, imageBaseUrl);
};

// searchBtn.addEventListener('click');
searchFormElem.addEventListener('submit', handleFormSubmit);
