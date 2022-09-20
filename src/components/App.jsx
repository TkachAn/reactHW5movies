import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from 'pages/SharedLayout/SharedLayout';
import Details from 'pages/details/details';
const Home = lazy(() => import('pages/home/home'));
const Search = lazy(() => import('pages/search/search'));
const Credits = lazy(() => import('../pages/details/credits/credits'));
const Reviews = lazy(() => import('../pages/details/reviews/reviews'));
export const App = () => {
  return (
    <>
      <Suspense fallback={<h3>Loading...</h3>}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/:details" element={<Details />}>
              <Route path="cast" element={<Credits />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};
// import { Home } from 'pages/home/home';
// import { Search } from 'pages/search/search';
// import { Credits } from 'pages/details/credits/credits';
// import { Reviews } from 'pages/details/reviews/reviews';
// const Details = lazy(() =>
//   import('pages/details/details')
// );
