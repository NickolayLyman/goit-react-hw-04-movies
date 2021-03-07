import { useState, useEffect, lazy, Suspense } from 'react';
import {
  useParams,
  Route,
  NavLink,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import api from '../../service/api';

const Cast = lazy(() => import('../Cast/Cast'));
const Reviews = lazy(() => import('../MovieReviews/MovieReviews'));

const MovieInfoPage = () => {
  const srcBaseUrl = 'https://image.tmdb.org/t/p/w500';
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [isCastVisible, setIsCastVisible] = useState(false);
  const [isReviewsVisible, setIsReviewsVisible] = useState(false);

  useEffect(() => {
    const renderMovieInfo = () => {
      api.fetchMovieInfo(movieId).then(setMovie);
    };
    renderMovieInfo();
  }, [movieId]);
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
  const comeBack = () => {
    if (location.state && location.state.from) {
      return history.push(location.state.from);
    }
    history.push('/');
  };
  return (
    <>
      <button onClick={comeBack}>
        <span>Come back</span>
      </button>
      {movie && (
        <>
          <img src={`${srcBaseUrl}${movie.poster_path}`} alt={movie.title} />
          <h3>
            {movie.title}({movie.release_date.split('-')[0]})
          </h3>
          <span>User score: {movie.vote_average * 10}%</span>
          <h3>Overview</h3>
          <span>{movie.overview}</span>
          {<h3>Genres</h3>}
          {<span>{movie.genres.map(genre => genre.name).join(' ')}</span>}
          <span>Additional information</span>
          <ul>
            <li>
              <NavLink
                to={{ pathname: `${url}/cast` }}
                onClick={makeCastVisible}
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{ pathname: `${url}/reviews` }}
                onClick={makeReviewsVisible}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
          <Suspense fallback={<h2>Loading</h2>}>
            <Route path={`${path}/:cast`}>
              {movie && isCastVisible && <Cast />}
            </Route>
            <Route path={`${path}/:reviews`}>
              {movie && isReviewsVisible && <Reviews />}
            </Route>
          </Suspense>
        </>
      )}
    </>
  );
};

export default MovieInfoPage;
