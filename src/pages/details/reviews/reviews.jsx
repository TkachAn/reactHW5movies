import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { apiTMDbReviews } from '../../../TMBD/API';
import css from './reviews.module.css';

export default function Reviews() {
  const [reviewList, setReviewList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const id = useParams().details;
  useEffect(() => {
    if (!id) return;
    const fetchTMBd = () => {
      setLoading(true);
      apiTMDbReviews(id)
        .then(res => {
          setReviewList(res);
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

      {reviewList.length ? (
        <ul>
          {reviewList.map(review => {
            return (
              <li key={review.id}>
                <h4 className={css.h41}>Author:{review.author}</h4>
                <p className={css.text}>{review.content}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <>
          <h3 className={css.h3}>There are no reviews yet</h3>
          <p>
            You will be the first to leave a review here, but for this you need
            to register on
            <a href="https://www.themoviedb.org/login"> the TMDB website</a>.
          </p>
        </>
      )}
    </>
  );
}
