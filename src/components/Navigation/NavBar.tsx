import { useContext } from 'react';

import Link from 'next/link';

import { AuthContext } from '../../contexts/AuthContex';

export const NavBar = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
      <div className="container mx-auto ">
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
            </div>
            <Link className="btn btn-ghost normal-case text-xl " href={'/'}>
              FutQuinta <span className="logo">Score</span>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
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
          </div>
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
    </>
  );
};
