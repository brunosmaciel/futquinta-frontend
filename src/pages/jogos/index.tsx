import { formatInTimeZone } from 'date-fns-tz';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import useSWR from 'swr';

import { GameType } from '../../..';
import { LoadingSpin } from '../../components/Loading';
import { api } from '../../services/axios';

const Jogos = () => {
  const { data: games, isLoading } = useSWR<GameType[]>('/games');

  if (isLoading) {
    return <LoadingSpin />;
  }

  if (games) {
    const gamesFinished = games.filter((game) => game.status === 'FINISHED');
    return (
      <>
        <div>
          <main className="container mx-auto flex-grow lg:w-[80%] ">
            {gamesFinished.length > 0 && (
              <>
                <div className="divider"></div>
                <div>
                  <div className="mx-2 ">
                    <h1 className="font-bold my-2">Todos os jogos</h1>
                    {gamesFinished.map((game) => (
                      <div
                        className=" p-2 flex flex-col gap-4 my-2 hover:bg-[#191D24] transition-all cursor-pointer"
                        key={game.id}
                      >
                        <div className="mx-2 mt-[0.1rem] flex  w-full justify-between">
                          <div className="flex">
                            <div className="flex flex-col items-center w-24">
                              <p>{formatInTimeZone(game.gameDate, 'America/Sao_Paulo', 'dd/MM')}</p>
                              <p className="text-sm">Rodada {game.fixture}</p>
                            </div>
                            <div className="divider divider-horizontal"></div>
                            <div className="">
                              <div className="flex justify-between w-20">
                                <p className="text-white">Preto </p>
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
  const { data: games } = await api.get<GameType[]>('/games');

  return {
    props: {
      games,
    },
    revalidate: 60,
  };
};
export default Jogos;
