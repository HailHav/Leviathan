const apiKey = '9b1a66356cd028cd9f69f02cd9c543cb';
const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;

const requestOptions = {
  method: 'GET',
};

fetch(apiUrl, requestOptions)
  .then(response => {
    console.log('Status Code:', response.status);  // Log the status code
    if (!response.ok) {
      return response.text().then(text => {  // Log the response text
        throw new Error(`Network response was not ok: ${text}`);
      });
    }
    return response.json();
  })
  .then(data => {
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(error => {
    console.error('Error:', error);
  });
