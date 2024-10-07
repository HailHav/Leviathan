const apiKey = '9b1a66356cd028cd9f69f02cd9c543cb';
const baseUrl = `https://api.themoviedb.org/3/discover/movie`;
const genreUrl = `https://api.themoviedb.org/3/genre/movie/list`;
const mtgBaseUrl = "https://api.scryfall.com/cards/random";

///rando movie generator
// Fetch genres and populate the dropdown
fetch(`${genreUrl}?api_key=${apiKey}`)
  .then(response => response.json()) // Parse the JSON response
  .then(data => {
    const genreSelect = document.getElementById('genreSelect'); // Find the genre select dropdown
    data.genres.forEach(genre => {
      const option = document.createElement('option'); // Create option element for each genre
      option.value = genre.id; // Set the value to the genre ID
      option.textContent = genre.name; // Set the display text to the genre name
      genreSelect.appendChild(option); // Append option to the dropdown
    });
  })
  .catch(error => console.error('Error fetching genres:', error)); // Log any errors

// Fetch and display a random movie based on selected genre
document.getElementById('randomMovieButton').addEventListener('click', () => {
  const genreId = document.getElementById('genreSelect').value; // Get selected genre ID
  if (!genreId) {
    alert('Please select a genre.'); // Alert if no genre is selected
    return;
  }

  const randomMovieUrl = `${baseUrl}?api_key=${apiKey}&with_genres=${genreId}&sort_by=popularity.desc&page=${Math.floor(Math.random() * 500) + 1}`;

  fetch(randomMovieUrl)
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
      const randomMovie = data.results[Math.floor(Math.random() * data.results.length)]; // Select a random movie
      const randomMovieContainer = document.getElementById('randomMovie'); // Find the container to display the movie
      randomMovieContainer.innerHTML = ''; // Clear any previous content

      // Create a Bootstrap card div
      const movieDiv = document.createElement('div');
      movieDiv.classList.add('card', 'col-sm-6', 'col-md-4', 'col-lg-3', 'mb-4'); // Add responsive column classes

      // Add the movie image at the top
      if (randomMovie.poster_path) {
        const moviePoster = document.createElement('img');
        moviePoster.classList.add('card-img-top'); // Utilize Bootstrap's card-img-top class
        moviePoster.src = `https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`;
        movieDiv.appendChild(moviePoster);
      } else {
        // If no image is available, display a text placeholder
        const noImageText = document.createElement('div');
        noImageText.textContent = "Image not available";
        movieDiv.appendChild(noImageText);
      }

      // Create a card body div
      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');

      // Add the movie title
      const movieTitle = document.createElement('h5');
      movieTitle.classList.add('card-title');
      movieTitle.textContent = randomMovie.title;

      // Add the movie overview
      const movieOverview = document.createElement('p');
      movieOverview.classList.add('card-text');
      movieOverview.textContent = randomMovie.overview;

      // Append the title and overview to the card body
      cardBody.appendChild(movieTitle);
      cardBody.appendChild(movieOverview);

      // Append the card body to the card div
      movieDiv.appendChild(cardBody);
      // Append the card div to the main container
      randomMovieContainer.appendChild(movieDiv);
    })
    .catch(error => console.error('Error fetching random movie:', error)); // Log any errors
});



//movie grid






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


// Fetch and display latest movies
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
    moviesContainer.innerHTML = '';  // Clear previous content
    if (movies.length === 0) {
      moviesContainer.textContent = 'No movies found for the selected date range.';
      return;
    }


    movies.forEach(movie => {
     // Create a Bootstrap card
      const movieDiv = document.createElement('div');
      movieDiv.classList.add('col-md-3', 'mb-6');

      const card = document.createElement('div');
      card.classList.add('card');
      const moviePoster = document.createElement('img');
      moviePoster.classList.add('card-img-top');

      const moviePosterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'path/to/default/image.jpg';
      moviePoster.src = moviePosterPath;
      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
      const movieTitle = document.createElement('h5');
      movieTitle.classList.add('card-title');
      movieTitle.textContent = movie.title;
      const movieOverview = document.createElement('p');
      movieOverview.classList.add('card-text');
      movieOverview.textContent = movie.overview;
      cardBody.appendChild(movieTitle);
      cardBody.appendChild(movieOverview);
      card.appendChild(moviePoster);
      card.appendChild(cardBody);
      movieDiv.appendChild(card);
      moviesContainer.appendChild(movieDiv);
    });
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });

//Magic
// Fetch and display a random Magic: The Gathering card
fetch(mtgBaseUrl)
  .then(response => response.json()) // Parse the JSON response
  .then(data => {
    const card = data; // Store the card data
    const cardContainer = document.getElementById('card'); // Find the container to display the card
    cardContainer.innerHTML = '';  // Clear any previous content

    // Create a Bootstrap card div
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card', 'col-sm-6', 'col-md-4', 'col-lg-3', 'mb-4'); // Add responsive column classes

    // Add the card image at the top
    if (card.image_uris && card.image_uris.normal) {
      const cardImage = document.createElement('img');
      cardImage.classList.add('card-img-top');
      cardImage.src = card.image_uris.normal;
      cardDiv.appendChild(cardImage);
    } else {
      // If no image is available, display a text placeholder
      const noImageText = document.createElement('div');
      noImageText.textContent = "Image not available";
      cardDiv.appendChild(noImageText);
    }

    // Create a card body div
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // Add the card name
    const cardName = document.createElement('h5');
    cardName.classList.add('card-title');
    cardName.textContent = card.name;

    // Add the card text (oracle or flavor text)
    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.textContent = card.oracle_text || card.flavor_text;

    // Append the card name and text to the card body
    cardBody.appendChild(cardName);
    cardBody.appendChild(cardText);

    // Append the card body to the card div
    cardDiv.appendChild(cardBody);
    // Append the card div to the main container
    cardContainer.appendChild(cardDiv);
  })
  .catch(error => console.error('Error fetching MTG card:', error)); // Log any errors
