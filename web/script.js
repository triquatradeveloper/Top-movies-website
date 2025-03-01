particlesJS("particles-js", {
    "particles": {
        "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#ffffff" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5 },
        "size": { "value": 3, "random": true },
        "line_linked": { "enable": true, "color": "#ffffff", "opacity": 0.4 },
        "move": { "enable": true, "speed": 3 }
    },
    "retina_detect": true
});

const API_KEY = 'paste_your_tmbd_api';
const API_URL = `https://api.themoviedb.org/3`;
let currentImageIndex = 0;
let images = [];

async function fetchMovies() {
    const genre = document.getElementById('genre').value;
    const url = genre
        ? `${API_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genre}`
        : `${API_URL}/trending/movie/day?api_key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayMovies(movies) {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.onclick = () => openModal(movie.id);
        movieCard.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}"><div class="movie-rating">Rating: ${movie.vote_average}</div>`;
        movieList.appendChild(movieCard);
    });
}

function closeModal() {
    document.getElementById('modal-overlay').style.display = 'none';
}

fetchMovies();
