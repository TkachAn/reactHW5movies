import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { apiTMDbCredits } from '../../../TMBD/API';

import css from './credit.module.css';
export default function Credits() {
  const [castList, setCastList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const id = useParams().details;
  useEffect(() => {
    if (!id) return;
    const fetchTMBd = () => {
      setLoading(true);
      apiTMDbCredits(id)
        .then(res => {
          setCastList(res);
        })
        .catch(error => {
          setError(`UPS, this is ${error}`);
        })
        .finally(setLoading(false));
    };

    if (id) {
      fetchTMBd();
    }
  }, [id]);
  return (
    <>
      {loading && <h3 className={css.h3}>LOADING...</h3>}
      {error && <div>{error}</div>}
      {castList.length ? (
        <>
          {' '}
          <ul className={css.castList}>
            {castList.map(castItem => {
              return (
                <li key={castItem.id} className={css.castItem}>
                  <div className={css.tumb}>
                    {castItem.profile_path ? (
                      <img
                        className={css.img}
                        src={`https://image.tmdb.org/t/p/w300${castItem.profile_path}`}
                        alt={`${castItem.name} portrait`}
                      />
                    ) : (
                      <img src="https://via.placeholder.com/300x450" alt="" />
                    )}
                  </div>

                  <div className={css.text}>
                    <h4 className={css.h41}>{castItem.name}</h4>
                    <p>Character: {castItem.character}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <>
          <h3 className={css.h3}>cast list not available</h3>
        </>
      )}
      <ul className={css.castList}>
        {castList.map(castItem => {
          return (
            <li key={castItem.id} className={css.castItem}>
              <div className={css.tumb}>
                {castItem.profile_path ? (
                  <img
                    className={css.img}
                    src={`https://image.tmdb.org/t/p/w300${castItem.profile_path}`}
                    alt={`${castItem.name} portrait`}
                  />
                ) : (
                  <img src="https://via.placeholder.com/300x450" alt="" />
                )}
              </div>

              <div className={css.text}>
                <h4 className={css.h41}>{castItem.name}</h4>
                <p>Character: {castItem.character}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
