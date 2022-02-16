const renderNextPageBtn = (paginationContainer, nextPage, url) => {
  const paginationBtn = document.createElement('button');
  paginationBtn.textContent = 'Show more';
  paginationBtn.classList.add('pagination__show-more-btn');
  paginationBtn.dataset.nextPage = nextPage;
  paginationBtn.dataset.fetchUrl = url;
  paginationContainer.replaceChildren(paginationBtn);
  return paginationBtn;
};

const renderCards = ({
  elements: { containerElem, paginationElem, messageElem },
  movies,
  baseUrl,
  genres,
  userInput,
  showMore = false,
}) => {
  paginationElem.replaceChildren();
  messageElem.replaceChildren();

  if (!showMore) {
    containerElem.replaceChildren();
  }

  if (movies.length === 0) {
    containerElem.replaceChildren();
    messageElem.textContent = `No results were found for '${userInput}'! Please try a different search.`;
    return;
  }

  movies.forEach((movie) => {
    const { poster_path: posterPath, genre_ids: genreIdList } = movie;
    const imgSrc = posterPath ? `${baseUrl}w500${posterPath}` : './assets/img/no-poster.jpg';
    const genreList = genreIdList
      .map((targetId) => genres.find((genre) => genre.id === targetId))
      .map((genre) => genre.name);
    const mainGenre = genreList.length ? genreList[0] : '';

    const newCard = document.createElement('article');
    newCard.classList.add('movie-card');
    newCard.innerHTML = `
      <div class="movie-card__poster-container">
        <div class="movie-card__poster">
          <img class="movie-card__img" src="${imgSrc}" alt="${movie.title}" />
        </div>
        <div class="movie-card__extra-info">
          <div class="movie-card__info-title">Genres:</div>
          <div class="movie-card__genres">${genreList.join(', ')}</div>
          <div class="movie-card__info-title">Release:</div>
          <div class="movie-card__release-date">${movie.release_date}</div>
          <div class="movie-card__overview">${movie.overview}</div>
        </div>
      </div>
      <div class="movie-card__info">
        <div class="movie-card__title">${movie.title}</div>
        <div class="movie-card__main-genre">${mainGenre}</div>
        <div class="movie-card__rating">${movie.vote_average.toFixed(1)}</div>
      </div>

    `;
    containerElem.append(newCard);
  });
};

export { renderCards, renderNextPageBtn };
