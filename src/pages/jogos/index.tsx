import { formatInTimeZone } from 'date-fns-tz';
import Link from 'next/link';
import useSWR from 'swr';

import { GameType } from '../../..';
import { LoadingSpin } from '../../components/Loading';

const Jogos = () => {
  const { data: games, isLoading } = useSWR<GameType[]>('/games');

  if (isLoading) {
    return <LoadingSpin />;
  }

  if (!games || games.length === 0) {
    return (
      <main className="container mx-auto flex-grow lg:w-[80%]">
        <h1 className="my-4 text-center text-lg">Nenhum jogo encontrado</h1>
      </main>
    );
  }

  return (
    <main className="container mx-auto flex-grow lg:w-[80%]">
      <div className="divider" />

      <section className="mx-2">
        <h1 className="my-2 font-bold">Todos os jogos</h1>

        {games.map((game) => (
          <article
            key={game.id}
            className="flex items-center hover:shadow-2xl hover:w-[93%] rounded-2xl transition-all justify-between gap-5 p-2  w-[90%] mx-auto cursor-pointer"
          >
            <div className="mx-2 mt-[0.1rem] flex w-full justify-between">
              <div className="flex">
                {/* Data e rodada */}
                <div className="flex w-24 flex-col items-center">
                  <p>{formatInTimeZone(game.gameDate, 'America/Sao_Paulo', 'dd/MM')}</p>
                  <p className="text-sm">Rodada {game.fixture}</p>
                </div>

                <div className="divider divider-horizontal" />

                {/* Placar */}
                <div>
                  <div className="flex w-20 justify-between">
                    <p className="text-white">Preto</p>
                    <p className="text-white">{game.greenGoals}</p>
                  </div>
                  <div className="flex w-20 justify-between">
                    <p className="text-white">Branco</p>
                    <p className="text-white">{game.whiteGoals}</p>
                  </div>
                </div>
              </div>

              {/* Ação */}
              <div className="flex items-end gap-2 px-2">
                <Link href={`/jogos/${game.id}`} className="link pr-2">
                  Ver mais
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Jogos;
