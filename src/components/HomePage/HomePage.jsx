import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../../service/api';
import s from './HomePage.module.css';
import PropTypes from 'prop-types';

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
      <h1 className={s.title}>Popular today</h1>
      <ul className={s.list}>
        {popularMovies.map(({ poster_path, title, id }) => (
          <li key={id} className={s.list_item}>
            <Link
              to={{
                pathname: `/movies/${id}`,
                state: { from: location.pathname },
              }}
            >
              <img
                src={`${srcBaseUrl}${poster_path}`}
                alt="Movie poster"
                className={s.poster}
              />
              <h3 className={s.subtitle}>{title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

HomePage.propTypes = {
  popularMovies: PropTypes.array,
};

export default HomePage;
