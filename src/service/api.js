import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'f2c48f8e3f2e8ceb9b5f5ca977db990f';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  api_key: API_KEY,
  language: 'en-US',
};

const fetchPopularMovies = async () => {
  try {
    const config = {
      url: `trending/movie/week`,
    };
    const { data } = await axios(config);
    return data.results;
  } catch (error) {
    new Error('No response from server');
  }
};

async function fetchMovieInfo(movie_id) {
  try {
    const config = { url: `movie/${movie_id}` };
    const { data } = await axios(config, movie_id);
    return data;
  } catch (error) {
    new Error('No response from server');
  }
}

async function fetchMoviesCast(movie_id) {
  try {
    const config = { url: `movie/${movie_id}/credits` };
    const { data } = await axios(config, movie_id);
    return data.cast;
  } catch (error) {
    new Error('No response from server');
  }
}

async function fetchMovieReviews(movie_id) {
  try {
    const config = { url: `movie/${movie_id}/reviews` };
    const { data } = await axios(config, movie_id);
    return data.results;
  } catch (error) {
    new Error('No response from server');
  }
}

async function fetchMoviesByQuery(query) {
  try {
    const config = { url: `search/movie`, params: { query } };
    const { data } = await axios(config);
    if (data.results.length === 0) {
      toast.warn('No results were found for your search.');
      return;
    }
    return data.results;
  } catch (error) {
    new Error('No response from server');
  }
}

const api = {
  fetchPopularMovies,
  fetchMovieInfo,
  fetchMoviesCast,
  fetchMovieReviews,
  fetchMoviesByQuery,
};

export default api;
