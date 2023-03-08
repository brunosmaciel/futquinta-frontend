import { GetStaticProps } from 'next';
import Link from 'next/link';
import useSWR from 'swr';

import { Game } from '../../..';
import { GameContainer } from '../../components/Dashboard/DashboardGameContainer';
import { LoadingSpin } from '../../components/Loading';
import { api } from '../../services/axios';

const Jogos = () => {
  const { data: games, isLoading } = useSWR<Game[]>('/games');

  if (isLoading) {
    return <LoadingSpin />;
  }

  if (games) {
    const gamesInProgress = games.filter((game) => {
      return game.status === 'IN_PROGRESS' || game.status === 'NOT_STARTED';
    });
    const gamesFinished = games.filter((game) => game.status === 'FINISHED');
    return (
      <>
        <div>
          <main className="container mx-auto flex-grow lg:w-[80%] ">
            {gamesInProgress.length > 0 ? (
              <>
                <div className="mx-2">
                  <h1 className="font-bold my-2">
                    Jogos em progresso{' '}
                    <span className="indicator-item badge badge-primary bg-green-800 border-green-500 ">
                      Ao vivo
                    </span>{' '}
                  </h1>
                  <div className="flex flex-col gap-4">
                    {games
                      ?.filter(
                        (game: Game) =>
                          game.status === 'NOT_STARTED' || game.status === 'IN_PROGRESS'
                      )
                      .map((game: Game) => (
                        <GameContainer game={game} key={game.id} />
                      ))}
                  </div>
                </div>
              </>
            ) : (
              ''
            )}
            {gamesFinished.length > 0 && (
              <>
                <div className="divider"></div>
                <div>
                  <div className="mx-2 ">
                    <h1 className="font-bold my-2">Todos os jogos</h1>
                    {gamesFinished.map((game) => (
                      <div
                        className="flex flex-col gap-4 my-2 hover:bg-[#191D24] transition-all cursor-pointer"
                        key={game.id}
                      >
                        <div
                          className="mx-2 mt-[0.1rem] flex  w-full justify-between"
                          key={game.id}
                        >
                          <div className="flex">
                            <div className="flex flex-col items-center w-12">
                              <p>
                                {new Date(game.createdAt).toLocaleDateString('pt-BR').slice(0, 5)}
                              </p>
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
                          <div className="flex  px-2 gap-2  items-end">
                            <Link href={`/jogos/${game.id}`} className="link pr-2">
                              Ver mais
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </>
    );
  }
};

export const getStaticProps: GetStaticProps = async () => {
  const { data: games } = await api.get<Game[]>('/games');

  return {
    props: {
      games,
    },
    revalidate: 60,
  };
};
export default Jogos;
