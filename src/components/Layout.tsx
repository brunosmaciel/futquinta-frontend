import { useContext } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { AuthContext } from '../contexts/AuthContex';
import { Footer } from './Footer';
import { NavBar } from './Navigation/NavBar';
import { SideBar } from './Navigation/SideBar';
import { Button } from './Button';
import Logo from './ui/Logo';
type LayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useRouter();
  const { user, logOut } = useContext(AuthContext);

  if (pathname.includes('dashboard')) {
    return (
      <>
        <Head>
          <title>FUTQUINTA - Admin</title>
        </Head>
        <main className="container-grid dashboard-h">
          <div className="logo container mx-auto ">
            <div className="navbar bg-base-100 px-0 ">
              <div className="navbar-start">
                <Link className="btn btn-ghost normal-case text-xl " href={'/'}>
                  <Logo className="h-10 w-10" />
                  FUTQUINTA
                </Link>
              </div>
              <div className="navbar-center hidden lg:flex"></div>
              <div className="navbar-end">
                <p className="text-sm hidden md:block">{user?.email}</p>
                <Button onClick={() => logOut()} className="ml-2 btn btn-primary btn-sm">
                  Sair
                </Button>
              </div>
            </div>
          </div>
          <>
            <SideBar />
          </>

          <main className="main w-full md:w-[95%]  dashboard-h ">{children}</main>
        </main>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>FUTQUINTA</title>
      </Head>
      <NavBar>
        <main className="container mx-auto min-h-screen flex flex-col justify-between main-container-height">
          {children}
        </main>
      </NavBar>

      <Footer />
    </>
  );
};

export { Layout };
