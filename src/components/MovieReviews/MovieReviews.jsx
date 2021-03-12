import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../service/api';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState(null);

  useEffect(() => {
    const renderMovieReviews = () => {
      api.fetchMovieReviews(movieId).then(setMovieReviews);
    };
    renderMovieReviews();
  }, [movieId]);

  return (
    <>
      {movieReviews && movieReviews.length > 0 ? (
        <ul>
          {movieReviews.map(({ id, author, content }) => (
            <li key={id}>
              <h2>{author}</h2>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Unfortunately there is no reviews yet</p>
      )}
    </>
  );
};

MovieReviews.propTypes = {
  movieReviews: PropTypes.array,
};

export default MovieReviews;
