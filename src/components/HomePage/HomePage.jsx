import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../../service/api';

const HomePage = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const srcBaseUrl = 'https://image.tmdb.org/t/p/w500';
  const location = useLocation();

  useEffect(() => {
    const renderPopularMovies = () => {
      api.fetchPopularMovies().then(response => setPopularMovies(response));
    };

    renderPopularMovies();
  }, []);
  return (
    <>
      <h1>Popular today</h1>
      <ul>
        {popularMovies.map(({ poster_path, title, id }) => (
          <li key={id}>
            <Link
              to={{
                pathname: `/movies/${id}`,
                state: { from: location.pathname },
              }}
            >
              <img src={`${srcBaseUrl}${poster_path}`} alt="Movie poster" />
              <h3>{title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;
