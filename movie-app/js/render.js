const renderCards = (content, data, baseUrl, genres) => {
  console.log(data);

  const movies = data.results;
  let container = content.querySelector('.main__movies-container');

  if (movies.length === 0) {
    const messageElem = document.createElement('div');
    messageElem.classList.add('main__message');
    messageElem.textContent = 'No results were found! Please try a different search.';
    content.replaceChildren(messageElem);
    return;
  }

  if (!container) {
    container = document.createElement('div');
    container.classList.add('main__movies-container');
    content.replaceChildren(container);
  }

  const cards = container.querySelectorAll('.movie-card');

  [...cards].filter((_card, i) => i >= movies.length).forEach((card) => card.remove());

  movies.forEach((movie, i) => {
    const { poster_path: posterPath, genre_ids: genreIdList } = movie;
    const imgSrc = posterPath ? `${baseUrl}w500${posterPath}` : './assets/img/no-poster.jpg';
    const genreList = genreIdList
      .map((targetId) => genres.find((genre) => genre.id === targetId))
      .map((genre) => genre.name);
    const mainGenre = genreList.length ? genreList[0] : '';

    if (i < cards.length) {
      const posterElem = cards[i].querySelector('.movie-card__poster');
      const titleElem = cards[i].querySelector('.movie-card__title');
      const genreElem = cards[i].querySelector('.movie-card__main-genre');
      const ratingElem = cards[i].querySelector('.movie-card__rating');
      const genreListElem = cards[i].querySelector('.movie-card__genres');
      const dateElem = cards[i].querySelector('.movie-card__release-date');
      const overviewElem = cards[i].querySelector('.movie-card__overview');

      const imgELem = new Image();
      imgELem.classList.add('movie-card__img');
      imgELem.src = imgSrc;
      imgELem.alt = movie.title;
      titleElem.textContent = movie.title;
      ratingElem.textContent = movie.vote_average;
      genreElem.textContent = mainGenre;
      genreListElem.textContent = genreList.join(', ');
      dateElem.textContent = movie.release_date;
      overviewElem.textContent = movie.overview;

      posterElem.replaceChildren(imgELem);
      return;
    }

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
        <div class="movie-card__rating">${movie.vote_average}</div>
      </div>

    `;
    container.append(newCard);
  });
};

export default renderCards;
