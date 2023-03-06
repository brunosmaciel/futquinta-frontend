import { useState } from 'react';

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import useSWR from 'swr';

import { Game } from '../../../..';
import { GameContainer } from '../../../components/Dashboard/DashboardGameContainer';
import { api } from '../../../services/axios';
export type GameProps = {
  games: Game[];
};
const Game = () => {
  const [isLoading, setIsLoading] = useState<'loading' | 'not_loading'>('not_loading');
  const { data: games } = useSWR<Game[]>('/games');
  const router = useRouter();

  const handleCreateGame = async () => {
    try {
      setIsLoading('loading');
      const data = await api.post('/games').then((res) => res.data);
      router.push(`/dashboard/jogos/${data.id}`);
      setIsLoading('not_loading');
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.log(err);
      setIsLoading('not_loading');
    }
  };

  return (
    <main className="container mx-auto flex-grow lg:w-[80%] ">
      <div className="flex items-center justify-end mx-2">
        <p className="mr-2">Nova partida</p>
        <button className={`btn btn-circle ${isLoading}`} onClick={handleCreateGame}>
          {isLoading === 'loading' ? (
            ''
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>
      </div>
      <div className="divider"></div>
      <div className="mx-2">
        <h1 className="font-bold my-2">
          Jogos em progresso{' '}
          <span className="indicator-item badge badge-primary bg-green-800 border-green-500 ">
            Ao vivo
          </span>{' '}
        </h1>
        <div className="flex flex-col gap-4">
          {games
            ?.filter((game: Game) => game.status === 'NOT_STARTED' || game.status === 'IN_PROGRESS')
            .map((game: Game) => (
              <GameContainer game={game} key={game.id} />
            ))}
        </div>
      </div>
      <div className="divider"></div>
      <div className="mx-2 ">
        <h1 className="font-bold my-2">Todos os jogos</h1>
        <div className="flex flex-col gap-4">
          {games &&
            games
              .filter((game: Game) => game.status === 'FINISHED')
              .map((game: Game) => <GameContainer key={game.id} game={game} />)}
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
