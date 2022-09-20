import { useLocation, useSearchParams } from 'react-router-dom';
import { useState, useEffect, Suspense, lazy } from 'react';
import { apiTMDbSearch } from '../../TMBD/API';
import css from './search.module.css';

const List = lazy(() => import('components/moviesList/moviesList'));

export default function Search() {
  const [searchMovies, setSearchMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [queryForm, setQueryForm] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();
  const query = searchParams.get('query');

  useEffect(() => {
    if (!query) return;

    const fetchTMBd = () => {
      setLoading(true);
      apiTMDbSearch(query)
        .then(res => {
          setSearchMovies(res);
        })
        .catch(error => {
          setError(`UPS, this is ${error}Search`);
        })
        .finally(setLoading(false));
    };

    fetchTMBd();
  }, [query]);

  const handleChange = e => {
    const { value } = e.currentTarget;
    setQueryForm(value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (queryForm.trim() === '') {
      alert('Enter the film title');
    }
    if (queryForm) {
      setSearchParams({ query: `${queryForm}` });
    }
  };

  return (
    <>
      <main>
        <div className={css.flex}>
          <h2 className={css.title}>Search</h2>
          <form onSubmit={onSubmit} className={css.form}>
            <input
              className={css.input}
              type="text"
              value={queryForm}
              name="page"
              onChange={handleChange}
              placeholder="enter your request, please."
              autoComplete="off"
              autoFocus
            />
            <button className={css.btn} type="submit"></button>
          </form>
        </div>
        <Suspense fallback={<h3>LOADING...</h3>}>
          {loading && <h3>LOADING...</h3>}
          {searchMovies.length > 0 && (
            <List movies={searchMovies} state={{ from: location.pathname }} />
          )}
        </Suspense>
        {error && <div>{('error_Search', error)}</div>}
      </main>
    </>
  );
}
// import { List } from 'components/moviesList/moviesList';
