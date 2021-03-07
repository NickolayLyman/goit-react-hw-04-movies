import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';

const HomePage = lazy(() => import('./components/HomePage/HomePage'));
const MoviePage = lazy(() => import('./components/MoviePage/MoviePage'));
const MovieInfo = lazy(() => import('./components/MovieInfo/MovieInfo'));

export default function App() {
  return (
    <>
      <AppBar />
      <Suspense fallback={<h1>Loading</h1>}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies" exact>
            <MoviePage />
          </Route>
          <Route path="/movies/:movieId">
            <MovieInfo />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}
