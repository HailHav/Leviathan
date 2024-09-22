const apiKey = '9b1a66356cd028cd9f69f02cd9c543cb';
const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;

const requestOptions = {
  method: 'GET',
};

fetch(apiUrl, requestOptions)
  .then(response => {
    if (!response.ok) {
      return response.text().then(text => {
        throw new Error(`Network response was not ok: ${text}`);
      });
    }
    return response.json();
  })
  .then(data => {
    const movies = data.results;
    const moviesContainer = document.getElementById('movies');
    movies.forEach(movie => {
      const movieDiv = document.createElement('div');
      movieDiv.classList.add('movie');
      
      const movieTitle = document.createElement('div');
      movieTitle.classList.add('movie-title');
      movieTitle.textContent = movie.title;
      
      const movieOverview = document.createElement('div');
      movieOverview.classList.add('movie-overview');
      movieOverview.textContent = movie.overview;
      
      movieDiv.appendChild(movieTitle);
      movieDiv.appendChild(movieOverview);
      moviesContainer.appendChild(movieDiv);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
