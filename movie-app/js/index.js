import constants from './constants.js';
import { renderCards, renderNextPageBtn } from './render.js';
import getData from './getData.js';
import getAuxillaryData from './preload.js';
import printSelfEvaluation from './selfEval.js';

const { imageBaseUrl, genres } = await getAuxillaryData();

const contentElem = document.querySelector('.main__content');
const containerElem = contentElem.querySelector('.main__movies-container');
const messageElem = contentElem.querySelector('.main__message');
const paginationElem = contentElem.querySelector('.main__pagination');
const searchFormElem = document.querySelector('.header__search-form');
const searchInputElem = searchFormElem.querySelector('.search-form__input');
const clearBtn = searchFormElem.querySelector('.search-form__reset');

const mainElements = {
  containerElem,
  messageElem,
  paginationElem,
};

const trendingData = await getData(constants.TRENDING_URL);
renderCards({
  elements: mainElements,
  movies: trendingData.results,
  baseUrl: imageBaseUrl,
  genres,
});

const loadNextPage = async (e) => {
  const { nextPage, fetchUrl } = e.target.dataset;
  const nextUrl = `${fetchUrl}&page=${nextPage}`;
  const data = await getData(nextUrl);
  console.log(data);
  renderCards({
    elements: mainElements,
    movies: data.results,
    baseUrl: imageBaseUrl,
    genres,
    showMore: true,
  });

  if (data.page < data.total_pages) {
    const nextPageBtn = renderNextPageBtn(paginationElem, data.page + 1, fetchUrl);
    nextPageBtn.addEventListener('click', loadNextPage);
  }
};

const handleFormSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const userInput = formData.get('user-input');
  const url = `${constants.SEARCH_MOVIE_URL_BASE}&query=${userInput}`;
  const data = await getData(url);
  renderCards({
    elements: mainElements,
    movies: data.results,
    baseUrl: imageBaseUrl,
    genres,
    userInput,
  });

  if (data.page < data.total_pages) {
    const nextPageBtn = renderNextPageBtn(paginationElem, data.page + 1, url);
    nextPageBtn.addEventListener('click', loadNextPage);
  }
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

searchFormElem.addEventListener('submit', handleFormSubmit);
searchFormElem.addEventListener('reset', handleFormReset);
searchInputElem.addEventListener('input', handleInput);
searchInputElem.addEventListener('invalid', handleInvalidInput);

if (trendingData.page < trendingData.total_pages) {
  const nextPageBtn = renderNextPageBtn(
    paginationElem,
    trendingData.page + 1,
    constants.TRENDING_URL
  );
  nextPageBtn.addEventListener('click', loadNextPage);
}

printSelfEvaluation();
