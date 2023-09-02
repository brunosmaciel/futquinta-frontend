import { UserIcon, Settings2Icon, HomeIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { SoccerBallIcon } from '../Dashboard/SoccerBallIcon';

type MenuType = {
  title: string;
  path: string;
  icon: React.ReactElement;
};
export const SideBar = () => {
  const { asPath } = useRouter();

  const menus: MenuType[] = [
    {
      path: '/dashboard/jogos',
      icon: <SoccerBallIcon />,
      title: 'Jogos',
    },
    {
      path: '/dashboard/jogadores',
      icon: <UserIcon />,
      title: 'Jogadores',
    },
    {
      path: '/dashboard/settings',
      icon: <Settings2Icon />,
      title: 'Configurações',
    },
  ];
  return (
    <aside className="sidebar w-fit h-[50%]  flex flex-col side-bar-fixed side-bar">
      <ul className="menu bg-base-100 p-2 rounded-box w-fit space-y-2">
        {menus.map(({ path, icon, title }, index) => {
          return (
            <li key={index}>
              <Link href={path} className={asPath.includes(path) ? 'link-active' : ''}>
                {icon}
                <span className="hidden md:block">{title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <ul className="menu bg-base-100 p-2 rounded-box w-fit ">
        <li className="">
          <Link href={'/'}>
            <HomeIcon />
            <span className="hidden md:block">Início</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};
