import { ReactNode, useContext, useEffect, useRef } from 'react';

import Link from 'next/link';

import { AuthContext } from '../../contexts/AuthContex';
import { useRouter } from 'next/router';
import { MedalIcon, ShirtIcon } from 'lucide-react';
import BallIcon from '../ui/BallIcon';

export const NavBar = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const menu = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (menu.current) {
      menu.current.checked = false;
    }
  }, [router.pathname]);

  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div className="drawer">
      <input ref={menu} id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar ">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-circle btn-ghost swap swap-rotate">
              {/* this hidden checkbox controls the state */}

              {/* hamburger icon */}
              <svg
                className="swap-off fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>

              {/* close icon */}
              <svg
                className="swap-on fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">
            <Link className="btn btn-ghost normal-case text-xl " href={'/'}>
              FutQuinta <span className="logo">Score</span>
            </Link>
          </div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              <li>
                <a>Jogadores</a>
              </li>
              <li>
                <a>Partidas</a>
              </li>
              <li>
                <a>Rankings</a>
              </li>
            </ul>
          </div>
          <div className="flex-none hidden lg:block">
            {isLoggedIn ? (
              <div className="navbar-end mr-2">
                <Link href={'/dashboard'} className="btn btn-outline">
                  Admin
                </Link>
              </div>
            ) : (
              <div className="navbar-end">
                <Link className="btn btn-primary" href="/login">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
        {children}
        Content
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200">
          <div className=" flex items-center gap-2">
            <Link className="btn btn-ghost normal-case text-xl " href={'/'}>
              FutQuinta <span className="logo">Score</span>
            </Link>
            {isLoggedIn ? (
              <div className="navbar-end mr-2">
                <Link href={'/dashboard'} className="btn btn-outline btn-sm">
                  Admin
                </Link>
              </div>
            ) : (
              <div className="navbar-end">
                <Link className="btn btn-primary btn-sm" href="/login">
                  Login
                </Link>
              </div>
            )}
          </div>
          <li className="text-lg mt-2">
            <Link href={`/jogadores`}>
              <ShirtIcon size={20} /> Jogadores{' '}
            </Link>
          </li>
          <li className="text-lg mt-2">
            <Link href={`/jogos`}>
              <BallIcon className="h-5 w-5" /> Partidas
            </Link>
          </li>
          <li className="text-lg mt-2">
            <Link href={`/rankings`}>
              <MedalIcon size={20} /> Rankings
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
