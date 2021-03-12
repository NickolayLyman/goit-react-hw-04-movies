import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../service/api';
import defaultImage from './default.jpg';
import s from './Cast.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const srcBaseUrl = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    const renderMovieCast = () => {
      api.fetchMoviesCast(movieId).then(setCast);
    };
    renderMovieCast();
  }, [movieId]);
  return (
    <>
      {cast && (
        <>
          <ul className={s.list}>
            {cast.map(({ cast_id, profile_path, name, character }) => (
              <li key={cast_id}>
                {profile_path ? (
                  <img
                    src={`${srcBaseUrl}${profile_path}`}
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
                <h3 className={s.actor}>{name}</h3>
                <span className={s.text_wrapper}>Character: {character}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

Cast.propTypes = {
  cast: PropTypes.array,
};

export default Cast;
