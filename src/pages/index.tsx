import type { NextPage } from 'next';
import useSWR from 'swr';

import { Game } from '../..';
import { LoadingSpin } from '../components/Loading';

const Home: NextPage = () => {
  const { data: games, isLoading } = useSWR<Game[]>('/games');
  if (isLoading) {
    return <LoadingSpin />;
  }
  return (
    <div className="margin">
      <div className="flex mt-4 ">
        <img
          src="https://estado.rs.gov.br/upload/recortes/201707/20075647_1210628_GDO.jpg"
          alt="avatar"
          className="w-12 h-12 rounded-full"
        />
        <div className="ml-4">
          <h1>Fut</h1>
          <h2>Quinta</h2>
        </div>
      </div>
      {games &&
        games.slice(0, 3).map((game) => (
          <>
            <div className="flex  text-sm">
              <div className="flex flex-col items-center w-12">
                <p>{new Date(game.createdAt).toLocaleDateString('pt-BR').slice(0, 5)}</p>
                <p>19:15</p>
              </div>
              <div className="divider divider-horizontal"></div>
              <div className="">
                <div className="flex justify-between w-20">
                  <p className="text-white">Verde </p>
                  <p className="text-white">{game.greenGoals}</p>
                </div>
                <div className="flex justify-between w-20">
                  <p className="text-white">Branco</p>
                  <p className="text-white">{game.whiteGoals}</p>
                </div>
              </div>
            </div>
          </>
        ))}
    </div>
  );
};

export default Home;
