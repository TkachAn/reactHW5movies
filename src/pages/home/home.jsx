import { useState, useEffect, lazy } from 'react';
import { apiTMDbTrend } from '../../TMBD/API';
import css from './home.module.css';
// import { List } from 'components/moviesList/moviesList';
const List = lazy(() =>
  import('components/moviesList/moviesList' /* webpackChunkName: "List" */)
);
export default function Home() {
  const [trendMovies, setTrendMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTMBd = () => {
      setLoading(true);
      apiTMDbTrend()
        .then(res => {
          setTrendMovies(res);
        })
        .catch(error => {
          setError(`UPS, this is ${error}`);
        })
        .finally(setLoading(false));
    };
    fetchTMBd();
  }, []);

  return (
    <main>
      <h2 className={css.title}>Trending Movies</h2>
      {loading && <h3>LOADING...</h3>}
      {trendMovies && <List movies={trendMovies} />}
      {error && <div>{('error', error)}</div>}
    </main>
  );
}
