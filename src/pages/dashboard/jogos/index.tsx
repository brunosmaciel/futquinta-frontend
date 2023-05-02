import { useState } from 'react';

import { PlusCircleIcon } from 'lucide-react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import useSWR from 'swr';

import { Game } from '../../../..';
import { GameContainer } from '../../../components/Dashboard/Games/GameContainer';
import { Wrapper } from '../../../components/Dashboard/Games/GameContainerWrapper';
import { LoadingSpin } from '../../../components/Loading';
import { api } from '../../../services/axios';
export type GameProps = {
  games: Game[];
};
const Game = () => {
  const [loadingButton, setIsLoading] = useState<'loading' | 'not_loading'>('not_loading');
  const { data: finishedGames } = useSWR<Game[]>('/games?status=finished');
  const { data: inProgressGames } = useSWR<Game[]>('/games?status=in_progress');
  const { data: notStartedGames, isLoading } = useSWR<Game[]>('/games?status=not_started');

  const router = useRouter();

  const handleCreateGame = async () => {
    try {
      setIsLoading('loading');

      const { data } = await api.post<Game>('/games');
      router.push(`/dashboard/jogos/${data.id}`);
    } catch (err: any) {
      setIsLoading('not_loading');
    }
  };
  if (isLoading) return <LoadingSpin />;

  return (
    <main className="container mx-auto flex-grow lg:w-[80%] ">
      <div className="flex items-center justify-start ">
        <button className={`btn btn-ghost gap-2 ${loadingButton}`} onClick={handleCreateGame}>
          {loadingButton === 'loading' ? (
            ''
          ) : (
            <PlusCircleIcon size={40} className="new-game-button" />
          )}
          Nova partida
        </button>
      </div>

      {inProgressGames && inProgressGames.length > 0 ? (
        <Wrapper text="Jogos em progresso" hasBadge={true}>
          {inProgressGames?.map((game) => (
            <GameContainer game={game} key={game.id} />
          ))}
        </Wrapper>
      ) : null}

      {notStartedGames && notStartedGames.length > 0 ? (
        <Wrapper text="A iniciar" hasBadge={false}>
          {notStartedGames.map((game) => (
            <GameContainer game={game} key={game.id} />
          ))}
        </Wrapper>
      ) : null}

      {finishedGames && finishedGames.length > 0 ? (
        <Wrapper text="Jogos Finalizados" hasBadge={false}>
          {finishedGames.map((game) => (
            <GameContainer game={game} key={game.id} />
          ))}
        </Wrapper>
      ) : null}
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
