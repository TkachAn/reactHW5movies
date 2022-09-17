import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'components/header/header';
import { Footer } from '../../components/footer/footer';
import { Container } from '../../components/container/container';

export function SharedLayout() {
  return (
    <Container>
      <Header />
      <Suspense fallback={<h2>LOADING...</h2>}>
        <Outlet />
      </Suspense>
      <Footer />
    </Container>
  );
}
