import Head from 'next/head';
import { useRouter } from 'next/router';

import { Footer } from './Footer';
import { NavBar } from './Navigation/NavBar';
import { SideBar } from './Navigation/SideBar';
type LayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useRouter();

  if (pathname.includes('dashboard')) {
    return (
      <>
        <Head>
          <title>FutQuintaScore</title>
        </Head>
        <section className="flex flex-1 min-h-screen">
          <SideBar />
          <main className="border-2 w-full ">{children}</main>
        </section>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>FutQuintaScore</title>
      </Head>
      <NavBar />

      <main className="container mx-auto min-h-screen flex flex-col justify-between main-container-height">
        {children}
      </main>
      <Footer />
    </>
  );
};

export { Layout };
