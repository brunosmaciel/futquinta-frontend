import { useContext } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { AuthContext } from '../contexts/AuthContex';

const Nav = () => {
  const { pathname } = useRouter();

  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div className="container mx-auto">
      <div className="navbar bg-base-100 px-0">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            {pathname.includes('/dashboard') ? (
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href={'/dashboard/jogos'}>Partidas</Link>
                </li>
                <li>
                  <Link href={'/dashboard/jogadores'}>Jogadores</Link>
                </li>
              </ul>
            ) : (
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href={'/jogos'}>Partidas</Link>
                </li>
                <li>
                  <Link href={'/jogadores'}>Jogadores</Link>
                </li>

                <li>
                  <Link href={'/rankings'}>Rankings</Link>
                </li>
              </ul>
            )}
          </div>
          <Link className="btn btn-ghost normal-case text-xl " href={'/'}>
            FutQuintaScore
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          {pathname.includes('/dashboard') ? (
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link href={'/dashboard/jogadores'}>Jogadores</Link>
              </li>
              <li>
                <Link href={'/dashboard/jogos'}>Partidas</Link>
              </li>
            </ul>
          ) : (
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link href={'/jogadores'}>Jogadores</Link>
              </li>
              <li>
                <Link href={'/jogos'}>Partidas</Link>
              </li>

              <li>
                <Link href={'/rankings'}>Rankings</Link>
              </li>
            </ul>
          )}
        </div>
        {isLoggedIn ? (
          <div className="navbar-end">
            <Link href={'/dashboard'} className="btn">
              Dashboard
            </Link>
          </div>
        ) : (
          <div className="navbar-end">
            <a className="btn">Login</a>
          </div>
        )}
      </div>
    </div>
  );
};

export { Nav };
