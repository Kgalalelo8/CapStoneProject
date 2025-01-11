

const apiKey = 'http://www.omdbapi.com/?i=tt3896198&apikey=32661ac0'; 
const searchInput = document.getElementById('Input');
const searchButton = document.getElementById('btn');
const movieList = document.getElementById('List');
const movieDetails = document.getElementById('Details');
const detailsContent = document.getElementById('detailsContent');
const backButton = document.getElementById('backBtn');


searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchMovies(query);
  }
});


async function fetchMovies(query) {
  const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
  const data = await response.json();

  if (data.Response === 'True') {
    displayMovies(data.Search);
  } else {
    movieList.innerHTML = `<p>No movies found for "${query}". Please try another search.</p>`;
  }
}


function displayMovies(movies) {
  movieList.innerHTML = movies.map(movie => `
    <div class="movie-item" onclick="fetchMovieDetails('${movie.imdbID}')">
      <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
    </div>
  `).join('');
}


async function fetchMovieDetails(imdbID) {
  const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`);
  const movie = await response.json();

  if (movie.Response === 'True') {
    displayMovieDetails(movie);
  }
}

function displayMovieDetails(movie) {
  movieDetails.classList.remove('hidden');
  movieList.style.display = 'none';

  detailsContent.innerHTML = `
    <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}" style="width:100%;max-width:400px;margin:auto;display:block;">
    <h1>${movie.Title}</h1>
    <p><strong>Year:</strong> ${movie.Year}</p>
    <p><strong>Genre:</strong> ${movie.Genre}</p>
    <p><strong>Plot:</strong> ${movie.Plot}</p>
    <p><strong>Cast:</strong> ${movie.Actors}</p>
    <h3>Ratings:</h3>
    ${movie.Ratings.map(rating => `<p>${rating.Source}: ${rating.Value}</p>`).join('')}
  `;
}


backBtn.addEventListener('click', () => {
  movieDetails.classList.add('hidden');
  movieList.style.display = 'grid';
});
