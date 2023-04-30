import { useState } from 'react';

import { PlusCircleIcon } from 'lucide-react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import useSWR from 'swr';

import { Game } from '../../../..';
import { GameContainer } from '../../../components/Dashboard/DashboardGameContainer';
import { LoadingSpin } from '../../../components/Loading';
import { api } from '../../../services/axios';
export type GameProps = {
  games: Game[];
};
const Game = () => {
  const [loadingButton, setIsLoading] = useState<'loading' | 'not_loading'>('not_loading');
  const { data: finishedGames } = useSWR<Game[]>('/games?status=finished');
  const { data: inProgressGames, isLoading } = useSWR<Game[]>('/games?status=in_progress');
  const router = useRouter();

  const handleCreateGame = async () => {
    try {
      setIsLoading('loading');

      const data = await api.post('/games').then((res) => res.data);
      router.push(`/dashboard/jogos/${data.id}`);
      setIsLoading('not_loading');
    } catch (err: any) {
      setIsLoading('not_loading');
    }
  };
  if (isLoading) {
    return <LoadingSpin />;
  }
  return (
    <main className="container mx-auto flex-grow lg:w-[80%] ">
      <div className="flex items-center justify-start ">
        <button className={`btn btn-ghost gap-2 ${loadingButton}`} onClick={handleCreateGame}>
          {loadingButton === 'loading' ? '' : <PlusCircleIcon size={40} />}
          Nova partida
        </button>
      </div>
      {inProgressGames?.map((game) => {
        return (
          <>
            <div className="divider"></div>
            <div className="mx-2">
              <h1 className="font-bold my-2">
                Jogos em progresso{' '}
                <span className="indicator-item badge badge-primary bg-green-800 border-green-500 ">
                  Ao vivo
                </span>{' '}
              </h1>
              <div className="flex flex-col gap-4">
                <GameContainer game={game} key={game.id} />
              </div>
            </div>
          </>
        );
      })}
      <div className="divider"></div>
      <div className="mx-2 ">
        <h1 className="font-bold my-2">Jogos finalizados</h1>
        <div className="flex flex-col gap-4">
          {finishedGames?.map((game: Game) => (
            <GameContainer key={game.id} game={game} />
          ))}
        </div>
      </div>
    </main>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Game;
