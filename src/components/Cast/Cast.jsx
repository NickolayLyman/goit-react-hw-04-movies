import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../service/api';
import defaultImage from './default.jpg';

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
          <ul>
            {cast.map(({ id, profile_path, name, character }) => (
              <li key={id}>
                {profile_path ? (
                  <img
                    src={`${srcBaseUrl}${profile_path}`}
                    alt="Movie poster"
                  />
                ) : (
                  <img src={defaultImage} alt="Was not found" />
                )}
                <h3>{name}</h3>
                <span>Character: {character}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default Cast;
