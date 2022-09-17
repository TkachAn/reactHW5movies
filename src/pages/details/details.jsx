import {
  NavLink,
  Outlet,
  useParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useEffect, useState, Suspense } from 'react';
import { apiTMDbDetails } from '../../TMBD/API';
import css from './details.module.css';

export default function Details() {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const id = useParams().details;
  const getYear = () => new Date(movie.release_date).getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => navigate(location?.state?.from ?? '/');

  useEffect(() => {
    setLoading(true);
    apiTMDbDetails(id)
      .then(res => {
        setMovie(res);
      })
      .catch(error => {
        setError('Ooops. Something went wrong...Details');
      })
      .finally(() => setLoading(false));
  }, [id]);
  let activeClassName = {
    fontSize: 24,
    color: '#90cea1',
  };

  return (
    <>
      {loading && <h3>Loading ...</h3>}
      {error && <div>{error}</div>}
      {movie && (
        <div className={css.flex}>
          <div className={css.tumb}>
            {movie.poster_path ? (
              <img
                className={css.poster}
                src={'https://image.tmdb.org/t/p/w500' + movie.poster_path}
                alt={movie.title}
              />
            ) : (
              <img
                src="https://via.placeholder.com/320x480"
                alt={movie.title}
              />
            )}
          </div>
          <div className={css.block}>
            <button className={css.btnBack} onClick={handleClick}>
              Go back
            </button>
            <h2 className={css.title}>{movie.title}</h2>

            <div className={css.inf}>
              <h3 className={css.h3}>Year:</h3>
              <p className={css.year}>({getYear()}) </p>
              <h3 className={css.h3}>Score:</h3>
              <p className={css.score}>{movie.popularity} </p>
              <h3 className={css.h3}>Genres:</h3>
              <p className={css.genres}>
                {movie.genres.map(genre => `${genre.name},  `)}
              </p>
            </div>
            <div>
              <h3 className={css.h3ow}>Overview</h3>
              <p className={css.overview}>{movie.overview}</p>
            </div>
          </div>
        </div>
      )}
      <hr />
      <div>
        <div className={css.flexX}>
          <NavLink
            className={css.links}
            to={`/${id}/reviews`}
            style={({ isActive }) => (isActive ? activeClassName : undefined)}
            state={location.state}
          >
            <h4 className={css.reviews}>Reviews</h4>
          </NavLink>
          <NavLink
            className={css.links}
            to={`/${id}/cast`}
            style={({ isActive }) => (isActive ? activeClassName : undefined)}
            state={location.state}
          >
            <h4 className={css.cast}>Cast</h4>
          </NavLink>
        </div>
        <hr />
        <Suspense fallback={<h3>LOADING...</h3>}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}
