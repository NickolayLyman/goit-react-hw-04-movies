import { useState, useEffect, lazy, Suspense } from 'react';
import {
  useParams,
  Route,
  NavLink,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../service/api';
import s from './MovieInfo.module.css';
import defaultImage from './default.jpg';

const Cast = lazy(() => import('../Cast'));
const Reviews = lazy(() => import('../MovieReviews'));

const MovieInfoPage = () => {
  const srcBaseUrl = 'https://image.tmdb.org/t/p/w500';
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const [movie, setMovie] = useState(null);
  const [isCastVisible, setIsCastVisible] = useState(false);
  const [isReviewsVisible, setIsReviewsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const renderMovieInfo = () => {
      api.fetchMovieInfo(movieId).then(setMovie);
    };
    renderMovieInfo();
  }, [movieId]);

  const searchString = location.pathname.split('/')[3];

  const makeCastVisible = () => {
    if (isReviewsVisible === true) {
      setIsReviewsVisible(false);
    }
    setIsCastVisible(true);
  };
  const makeReviewsVisible = () => {
    if (isCastVisible === true) {
      setIsCastVisible(false);
    }
    setIsReviewsVisible(true);
  };

  useEffect(() => {
    if (searchString === 'reviews') {
      setIsReviewsVisible(true);
    } else if (searchString === 'cast') {
      setIsCastVisible(true);
    }
  }, [searchString]);

  function comeBack() {
    history.push(location?.state?.from || history.push('/'));
  }

  return (
    <>
      <button onClick={comeBack} className={s.btn}>
        Come back
      </button>
      {movie && (
        <div className={s.wrapper}>
          {movie.poster_path ? (
            <img
              src={`${srcBaseUrl}${movie.poster_path}`}
              alt={movie.title}
              className={s.poster}
            />
          ) : (
            <img src={defaultImage} alt="Was not found" className={s.poster} />
          )}
          <div>
            <h3 className={s.movie_title}>
              {movie.title}({movie.release_date.split('-')[0]})
            </h3>
            <span>User score: {movie.vote_average * 10}%</span>
            <h3>Overview</h3>
            <span>{movie.overview}</span>
            {<h3>Genres</h3>}
            {<span>{movie.genres.map(genre => genre.name).join(' ')}</span>}
            <h3>Additional information</h3>
            <ul className={s.wrapper}>
              <li>
                <NavLink
                  to={{
                    pathname: `${url}/cast`,
                    state: { ...location.state },
                  }}
                  onClick={makeCastVisible}
                  className={s.cast}
                >
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: `${url}/reviews`,
                    state: { ...location.state },
                  }}
                  onClick={makeReviewsVisible}
                  className={s.reviews}
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
            <Suspense fallback={<h2 className={s.fallback}>Loading...</h2>}>
              <Route path={`${path}/:cast`}>
                {movie && isCastVisible && <Cast />}
              </Route>
              <Route path={`${path}/:reviews`}>
                {movie && isReviewsVisible && <Reviews />}
              </Route>
            </Suspense>
          </div>
        </div>
      )}
    </>
  );
};

MovieInfoPage.propTypes = {
  movie: PropTypes.object,
  isCastVisible: PropTypes.bool,
  isReviewsVisible: PropTypes.bool,
};
export default MovieInfoPage;
