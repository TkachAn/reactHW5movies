import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const API_KEY = 'e8938dc969e4885481c1163e17374d0f';

const END_POINTS = {
  trendMovWeek: '/trending/movie/week',
  trendMovDay: '/trending/movie/day',
  trendAllWeek: '/trending/all/week',
  trendAllDay: '/trending/all/day',
  trendTvWeek: '/trending/tv/week',
  trendTvDay: '/trending/tv/day',
  queryMovSearch: '/search/movie',
  queryTvSearch: '/search/movie',
  movieDetails: '/movie',
  movieCredits: '/credits',
  movieReviews: '/reviews',
  queryPerson: '/search/person',
};

export const apiTMDbTrend = async () => {
  const res = await axios.get(
    `${END_POINTS.trendMovDay}?api_key=${API_KEY}&append_to_response=videos,images`
  );
  return res.data.results;
};

export const apiTMDbSearch = async (query, page = 1) => {
  const res = await axios.get(
    `${END_POINTS.queryMovSearch}?api_key=${API_KEY}&query=${query}&page=${page}&language=en-US&include_adult=false`
  );
  return res.data.results;
};

export const apiTMDbDetails = async id => {
  const res = await axios.get(
    `${END_POINTS.movieDetails}/${id}?api_key=${API_KEY}&language=en-US&include_adult=false`
  );

  return res.data;
};

export const apiTMDbCredits = async id => {
  const res = await axios.get(
    `/movie/${id}${END_POINTS.movieCredits}?api_key=${API_KEY}&language=en-US&include_adult=false`
  );

  return res.data.cast;
};

export const apiTMDbReviews = async (id, page = 1) => {
  const res = await axios.get(
    `/movie/${id}${END_POINTS.movieReviews}?api_key=${API_KEY}&language=en-US&include_adult=false&page=${page}`
  );

  return res.data.results;
};
