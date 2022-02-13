const renderCards = (container, data, baseUrl, genres) => {
  console.log(data);

  const movies = data.results.filter((movie) => movie.adult === false);
  const cards = container.querySelectorAll('.movie-card');

  [...cards].filter((_card, i) => i >= movies.length).forEach((card) => card.remove());

  movies.forEach((movie, i) => {
    const { poster_path: posterPath, genre_ids: genreIdList } = movie;
    const imgSrc = posterPath ? `${baseUrl}w500${posterPath}` : './assets/img/no-poster.jpg';
    const mainGenre = genreIdList.length
      ? genres.find((genre) => genre.id === genreIdList[0]).name
      : '';

    if (i < cards.length) {
      const posterElem = cards[i].querySelector('.movie-card__poster');
      const titleElem = cards[i].querySelector('.movie-card__title');
      const genreElem = cards[i].querySelector('.movie-card__main-genre');
      const ratingElem = cards[i].querySelector('.movie-card__rating');

      const imgELem = new Image();
      imgELem.classList.add('movie-card__img');
      imgELem.src = imgSrc;
      imgELem.alt = movie.title;
      titleElem.textContent = movie.title;
      ratingElem.textContent = movie.vote_average;
      genreElem.textContent = mainGenre;

      posterElem.replaceChildren(imgELem);
      return;
    }

    const newCard = document.createElement('article');
    newCard.classList.add('movie-card');
    newCard.innerHTML = `
      <div class="movie-card__poster">
        <img class="movie-card__img" src="${imgSrc}" alt="${movie.title}" />
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
