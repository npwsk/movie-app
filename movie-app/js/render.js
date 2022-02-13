const renderCards = (container, data, baseUrl) => {
  console.log(data);

  const movies = data.results.filter((movie) => movie.adult === false);
  const cards = container.querySelectorAll('.movie-card');

  [...cards].filter((_card, i) => i >= movies.length).forEach((card) => card.remove());

  movies.forEach((movie, i) => {
    const { poster_path: posterPath } = movie;
    const imgSrc = posterPath ? `${baseUrl}w500${posterPath}` : './assets/img/no-poster.jpg';

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

export default renderCards;
