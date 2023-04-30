import { useContext } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { AuthContext } from '../contexts/AuthContex';
import { Footer } from './Footer';
import { NavBar } from './Navigation/NavBar';
import { SideBar } from './Navigation/SideBar';
type LayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useRouter();
  const { user } = useContext(AuthContext);

  if (pathname.includes('dashboard')) {
    return (
      <>
        <Head>
          <title>FutQuinta - Admin</title>
        </Head>
        <main className="container-grid dashboard-h">
          <div className="logo container mx-auto ">
            <div className="navbar bg-base-100 px-0 ">
              <div className="navbar-start">
                <Link className="btn btn-ghost normal-case text-xl " href={'/'}>
                  FutQuinta <span className="logo">Score</span>
                </Link>
              </div>
              <div className="navbar-center hidden lg:flex"></div>
              <div className="navbar-end hidden lg:flex">
                <p>Logado como {user?.email}</p>
              </div>
            </div>
          </div>
          <>
            <SideBar />
          </>

          <main className="main w-full md:w-[70%]  main-content ">{children}</main>
        </main>
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
