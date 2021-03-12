import { useState, useEffect } from 'react';
import {
  NavLink,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import defaultImage from './default.jpg';
import api from '../../service/api';
import s from './MoviePage.module.css';

const MoviePage = () => {
  const [movies, setMovies] = useState(null);
  const [query, setQuery] = useState('');
  const { url } = useRouteMatch();
  const [request, setRequest] = useState('');
  const location = useLocation();
  const history = useHistory();
  const srcBaseUrl = 'https://image.tmdb.org/t/p/w500';

  const resetInput = () => {
    setQuery('');
  };
  const handleChangeRequest = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };
  const handleSubmit = event => {
    event.preventDefault();
    if (query !== '') {
      setRequest(query);
      history.push({
        pathname: location.pathname,
        search: `query=${query}`,
      });
      resetInput();
    } else if (query === '') {
      toast.error('Please enter your query.');
      return;
    }
  };
  const searchString = location.search.split('=')[1];

  useEffect(() => {
    const renderMoviesByQuery = () => {
      api.fetchMoviesByQuery(request || searchString).then(setMovies);
    };

    if (request) {
      renderMoviesByQuery();
      return;
    }

    if (location.search !== '') {
      renderMoviesByQuery();
    }
  }, [request, location.search, searchString]);
  return (
    <>
      <form onSubmit={handleSubmit} className={s.form}>
        <input
          type="text"
          autoComplete="off"
          placeholder="Search movies"
          value={query}
          onChange={handleChangeRequest}
          className={s.input}
        />
        <button type="submit" className={s.btn}>
          Search
        </button>
      </form>
      {movies && (
        <>
          <ul className={s.list}>
            {movies.map(({ title, id, poster_path }) => (
              <li key={id} className={s.list_item}>
                <NavLink
                  to={{
                    pathname: `${url}/${id}`,
                    state: { from: `${url}${location.search}` },
                  }}
                  className={s.link}
                >
                  {poster_path ? (
                    <img
                      src={`${srcBaseUrl}${poster_path}`}
                      alt="Movie poster"
                      className={s.poster}
                    />
                  ) : (
                    <img
                      src={defaultImage}
                      alt="Was not found"
                      className={s.poster}
                    />
                  )}
                  {title}
                </NavLink>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

MoviePage.propTypes = {
  movies: PropTypes.array,
  query: PropTypes.string,
  request: PropTypes.string,
};

export default MoviePage;
