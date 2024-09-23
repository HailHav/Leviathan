const apiKey = '9b1a66356cd028cd9f69f02cd9c543cb';
const baseUrl = `https://api.themoviedb.org/3/discover/movie`;
const mtgBaseUrl = "https://api.magicthegathering.io/v1/cards";

// Calculate the date range
const today = new Date();
const twoWeeksAgo = new Date(today);
twoWeeksAgo.setDate(today.getDate() - 14);

const todayStr = today.toISOString().split('T')[0];
const twoWeeksAgoStr = twoWeeksAgo.toISOString().split('T')[0];

// Define the query parameters
const params = new URLSearchParams({
  api_key: apiKey,
  "primary_release_date.gte": twoWeeksAgoStr,
  "primary_release_date.lte": todayStr,
  "include_adult": "false",
  "page": "1"
});

// Construct the full URL with query parameters
const apiUrl = `${baseUrl}?${params.toString()}`;

// Define the request options
const requestOptions = {
  method: 'GET'
};

fetch(apiUrl, requestOptions)
  .then(response => {
    console.log(response);
    if (!response.ok) {
      return response.text().then(text => {
        throw new Error(`Network response was not ok: ${text}`);
      });
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
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

      const moviePoster = document.createElement('img');
      moviePoster.classList.add('movie-poster');
      moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;  // Use the poster path from the API
      
      movieDiv.appendChild(movieTitle);
      movieDiv.appendChild(movieOverview);
      movieDiv.appendChild(moviePoster);
      moviesContainer.appendChild(movieDiv);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Magic the gathering
fetch(mtgBaseUrl, requestOptions)
  .then(response => {
    if (!response.ok) {
      return response.text().then(text => {
        throw new Error(`Network response was not ok: ${text}`);
      });
    }
    return response.json();
  })
  .then(data => {
    console.log('MTG Card Data:', data);  // Log the entire response to check the structure

    const card = data;  // Scryfall API returns a single card object
    const cardContainer = document.getElementById('card');
    cardContainer.innerHTML = '';
    
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    
    const cardName = document.createElement('div');
    cardName.classList.add('card-name');
    cardName.textContent = card.name;
    
    const cardText = document.createElement('div');
    cardText.classList.add('card-text');
    cardText.textContent = card.oracle_text || card.flavor_text;  // Use card text or flavor text
    
    cardDiv.appendChild(cardName);
    cardDiv.appendChild(cardText);
    console.log(card.image_uris);
    if (card.image_uris && card.image_uris.normal) {
      const cardImage = document.createElement('img');
      cardImage.classList.add('card-image');
      cardImage.src = card.image_uris.normal;  // Use the normal size image URL
      cardDiv.appendChild(cardImage);
    } else {
      const noImageText = document.createElement('div');
      noImageText.textContent = "Image not available";
      cardDiv.appendChild(noImageText);
    }
    
    cardContainer.appendChild(cardDiv);
  })
  .catch(error => {
    console.error('Error:', error);
  });
