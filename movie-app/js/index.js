import API_KEY from './config.js'; // eslint-disable-line import/extensions

const API_BASE = new URL('https://api.themoviedb.org');
const TRENDING_URL = new URL(`3/trending/movie/day?api_key=${API_KEY}`, API_BASE);
const CONFIG_URL = new URL(`3/configuration?api_key=${API_KEY}`, API_BASE);

const getData = (url) => fetch(url).then((res) => res.json());

const renderCards = (container, data, baseUrl) => {
  console.log(data);
  const movies = data.results.filter((movie) => movie.adult === false);
  const cards = container.querySelectorAll('.movie-card');

  [...cards].filter((_card, i) => i >= movies.length).forEach((card) => card.remove());

  movies.forEach((movie, i) => {
    const { poster_path: path } = movie;
    const imgSrc = `${baseUrl}w500${path}`;

    if (i < cards.length) {
      const titleElem = cards[i].querySelector('.movie-card__title');
      const posterElem = cards[i].querySelector('.movie-card__poster');
      const imgELem = new Image();
      imgELem.classList.add('movie-card__img');
      imgELem.src = imgSrc;
      imgELem.alt = movie.title;
      titleElem.textContent = movie.title;
      posterElem.replaceChildren(imgELem);
      return;
    }

    const newCard = document.createElement('article');
    newCard.classList.add('movie-card');
    newCard.innerHTML = `
      <div class="movie-card__poster">
        <img class="movie-card__img" src="${imgSrc}" alt="${movie.title}" />
      </div>
      <div class="movie-card__title">${movie.title}</div>
    `;
    container.append(newCard);
  });
};

const containerElem = document.querySelector('.main__movies-container');

const configObj = await getData(CONFIG_URL);
const {
  images: { base_url: imageBaseUrl },
} = configObj;

const trendingMovies = await getData(TRENDING_URL);

renderCards(containerElem, trendingMovies, imageBaseUrl);
