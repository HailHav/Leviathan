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
      
      movieDiv.appendChild(movieTitle);
      movieDiv.appendChild(movieOverview);
      moviesContainer.appendChild(movieDiv);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Fetch and display a random Magic: The Gathering card
fetch(`${mtgBaseUrl}?random=true`, requestOptions)
  .then(response => {
    if (!response.ok) {
      return response.text().then(text => {
        throw new Error(`Network response was not ok: ${text}`);
      });
    }
    return response.json();
  })
  .then(data => {
    const card = data.cards[0];  // Assuming the API returns an array of cards
    const cardContainer = document.getElementById('card');
    cardContainer.innerHTML = '';
    
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    
    const cardName = document.createElement('div');
    cardName.classList.add('card-name');
    cardName.textContent = card.name;
    
    const cardText = document.createElement('div');
    cardText.classList.add('card-text');
    cardText.textContent = card.text || card.flavor;  // Use card text or flavor text
    
    cardDiv.appendChild(cardName);
    cardDiv.appendChild(cardText);
    cardContainer.appendChild(cardDiv);
  })
  .catch(error => {
    console.error('Error:', error);
  });
