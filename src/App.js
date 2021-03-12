import { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AppBar from './components/AppBar';
import Container from './components/Container';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = lazy(() => import('./components/HomePage'));
const MoviePage = lazy(() => import('./components/MoviePage'));
const MovieInfo = lazy(() => import('./components/MovieInfo'));

export default function App() {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<h2 className="fallback">Loading...</h2>}>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/movies" exact component={MoviePage} />
          <Route path="/movies/:movieId" component={MovieInfo} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
      <ToastContainer
        className="toast"
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={true}
      />
    </Container>
  );
}
