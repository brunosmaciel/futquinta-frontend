import Head from 'next/head';

import { Footer } from './Footer';
import { Nav } from './Nav';
type LayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>FutQuintaScore</title>
      </Head>
      <Nav />

      <main className="container mx-auto min-h-screen flex flex-col justify-between main-container-height">
        {children}
      </main>
      <Footer />
    </>
  );
};

export { Layout };
