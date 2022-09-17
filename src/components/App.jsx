import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from 'pages/SharedLayout/SharedLayout';
// import { Home } from 'pages/home/home';
import Details from 'pages/details/details';
// import { Search } from 'pages/search/search';
// import { Credits } from 'pages/details/credits/credits';
// import { Reviews } from 'pages/details/reviews/reviews';
const Home = lazy(() =>
  import('pages/home/home' /* webpackChunkName: "Home" */)
);
const Search = lazy(() =>
  import('pages/search/search' /* webpackChunkName: "Search" */)
);
// const Details = lazy(() =>
//   import('pages/details/details' /* webpackChunkName: "Details" */)
// );
const Credits = lazy(() =>
  import('../pages/details/credits/credits' /* webpackChunkName: "Credits" */)
);
const Reviews = lazy(() =>
  import('../pages/details/reviews/reviews' /* webpackChunkName: "Reviews" */)
);
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
