import { useState, useEffect } from 'react';
import { NavLink, useRouteMatch, useLocation } from 'react-router-dom';
import api from '../../service/api';

const MoviePage = () => {
  const [movies, setMovies] = useState(null);
  const [query, setQuery] = useState('');
  const { url } = useRouteMatch();
  const [request, setRequest] = useState('');
  const location = useLocation();

  const handleChangeRequest = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };
  const handleSubmit = event => {
    event.preventDefault();
    setRequest(query);
  };

  useEffect(() => {
    const renderMoviesByQuery = () => {
      api.fetchMoviesByQuery(request).then(setMovies);
    };
    if (request) {
      renderMoviesByQuery();
    }
  }, [request]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          placeholder="Search movies"
          value={query}
          onChange={handleChangeRequest}
        />
        <button type="submit">Search</button>
      </form>
      {movies && (
        <>
          <ul>
            {movies.map(({ title, id }) => (
              <NavLink
                to={{
                  pathname: `${url}/${id}`,
                  state: { from: location.pathname },
                }}
              >
                <li key={id}>{title}</li>
              </NavLink>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default MoviePage;
