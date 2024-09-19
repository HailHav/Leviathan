import requests
from datetime import datetime, timedelta
from flask import Flask, render_template

app = Flask(__name__)

# Define the API endpoint and the API key
api_url = "https://api.themoviedb.org/3/discover/movie"
api_key = "9b1a66356cd028cd9f69f02cd9c543cb"

# Calculate the date two weeks ago
today = datetime.now()
two_weeks_ago = today - timedelta(days=14)
two_weeks_ago_str = two_weeks_ago.strftime('%Y-%m-%d')
today_str = today.strftime('%Y-%m-%d')

# Initialize variables to store all movies released in the last two weeks
all_movies = []

# Pagination variables
page = 1
total_pages = 1

# Loop through all pages to get all movies released in the last two weeks
while page <= total_pages:
    # Make the GET request to the API with date filters and pagination
    response = requests.get(api_url, params={
       "api_key": api_key,
       "primary_release_date.gte": two_weeks_ago_str,
       "primary_release_date.lte": today_str,
       "include_adult": "false",
       "page": page
    })

    # Check if the request was successful
    if response.status_code == 200:
        data = response.json()
        total_pages = data.get('total_pages', 1)
        movies = data.get('results', [])
        all_movies.extend(movies)
        page += 1
    else:
        break

# Extract specific data from the response
movies_data = []
for movie in all_movies:
    movie_title = movie.get('title')
    release_date = movie.get('release_date')
    overview = movie.get('overview')
    genre_ids = movie.get('genre_ids')
    poster_path = movie.get('poster_path')
    poster_url = f"https://image.tmdb.org/t/p/w500{poster_path}" if poster_path else None
    movies_data.append((movie_title, release_date, overview, genre_ids))

@app.route('/')
def show_movies():
    return render_template('index.html', movies=movies_data)

if __name__ == '__main__':
    app.run(debug=True)
