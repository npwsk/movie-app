import constants from './constants.js';
import renderCards from './render.js';
import getData from './getData.js';
import getAuxillaryData from './preload.js';
// import handleFormSubmit from './controllers.js';

const { imageBaseUrl, genres } = await getAuxillaryData();

const containerElem = document.querySelector('.main__movies-container');
const searchFormElem = document.querySelector('.header__search-form');
// const searchBtn = searchFormElem.querySelector('.search-form__submit');
const searchInputElem = searchFormElem.querySelector('.search-form__input');
const clearBtn = searchFormElem.querySelector('.search-form__reset');

const trendingMovies = await getData(constants.TRENDING_URL);
renderCards(containerElem, trendingMovies, imageBaseUrl, genres);

const handleFormSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const userInput = formData.get('user-input');
  console.log(formData);
  const resultData = await getData(`${constants.SEARCH_MOVIE_URL_BASE}&query=${userInput}`);
  renderCards(containerElem, resultData, imageBaseUrl, genres);
};

const handleFormReset = () => {
  clearBtn.classList.remove('search-form__reset--active');
  searchInputElem.focus();
};

const handleInput = (e) => {
  e.target.setCustomValidity('');

  if (e.target.value) {
    clearBtn.classList.add('search-form__reset--active');
  } else {
    clearBtn.classList.remove('search-form__reset--active');
  }
};

const handleInvalidInput = (e) => {
  e.target.setCustomValidity('Please, enter a movie title here');
};

// searchBtn.addEventListener('click');
searchFormElem.addEventListener('submit', handleFormSubmit);
searchFormElem.addEventListener('reset', handleFormReset);
searchInputElem.addEventListener('input', handleInput);
searchInputElem.addEventListener('invalid', handleInvalidInput);
