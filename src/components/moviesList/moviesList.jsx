import { Link, useLocation } from 'react-router-dom';
import css from './moviesList.module.css';
import PropTypes from 'prop-types';
export default function List({ movies }) {
  const location = useLocation();

  return (
    <>
      <ul className={css.list}>
        {movies.map(({ id, title, overview, backdrop_path }) => {
          return (
            <li className={css.item} key={id}>
              <div className={css.card}>
                <div className={css.tumb}>
                  <Link
                    to={`/${id}`}
                    state={{ from: location }}
                    // search={search}
                  >
                    {backdrop_path ? (
                      <img
                        src={'https://image.tmdb.org/t/p/w500' + backdrop_path}
                        alt="image_not_found"
                      />
                    ) : (
                      <img src="https://via.placeholder.com/500x280" alt="" />
                    )}
                  </Link>
                </div>
                <div>
                  <Link to={`/${id}`} state={{ from: location }}>
                    <h3 className={css.title}>{title}</h3>
                  </Link>
                  <p className={css.overview}>{overview}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
List.propTypes = {
  movies: PropTypes.array.isRequired,
};
