/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Suspense, useCallback } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Game, GeneralRankingAPIType, PlayerProfile } from '../..';
import { LoadingSpin } from '../components/Loading';
import { getTopScorers } from '../functions/functions';
import { HomePageGeneralRank } from './HomePageGeneralRank';

type HomeProps = {
  players: PlayerProfile[];
  games: Game[];
  generalRank: GeneralRankingAPIType[];
};
const HomeComponent = ({ players, games, generalRank }: HomeProps) => {
  const { push, prefetch } = useRouter();

  const topScorers = useCallback(() => {
    return getTopScorers(players);
  }, [players]);
  const scorers = topScorers().slice(0, 3);

  return (
    <div className="container-height mx-2  gap-2 ">
      <div className="flex flex-col items-center md:items-start gap-6">
        <h2 className=" font-bold text-lg">Ultimas partidas</h2>
        <div className="flex flex-wrap justify-center gap-2 ">
          {games.slice(0, 3).map((game) => (
            <div
              className="rounded-lg shadow-md bg-[#191D24] text-sm  p-2  roll-in-left"
              key={game.id}
            >
              <div className="flex flex-col items-center gap-[2px]">
                <span>{new Date(game.createdAt).toLocaleDateString('pt-BR').slice(0, 5)}</span>
                <span>19:15</span>
              </div>
              <div className="flex  mt-2 gap-2 items-center">
                <p className="h-4 w-4 rounded-full bg-green-500"></p>
                <span className="w-[44px]">Verde</span>
                <span>{game.greenGoals}</span>
              </div>
              <div className="flex  mt-[2px] gap-2 items-center ">
                <p className="h-4 w-4 rounded-full bg-white"></p>
                <div className="flex gap-2">
                  <span>Branco</span>
                  <span>{game.whiteGoals}</span>
                </div>
              </div>
              <div className="mt-2">
                <Link className="link" href={`/jogos/${game.id}`}>
                  Ver detalhes
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div>
          <Link className="link" href={`/jogos`}>
            Ver todos os jogos
          </Link>
        </div>
      </div>
      <div className="divider my-3"></div>
      <div className="flex flex-col items-center md:items-start">
        <h2 className="font-bold text-lg">Artilheiros</h2>

        <div className="flex flex-wrap gap-2 justify-center   my-4">
          <Suspense fallback={<LoadingSpin />}>
            {scorers.slice(0, 3).map((player) => (
              <div
                key={player.id}
                className=" bg-[#191D24] w-24 h-32 rounded-lg flex flex-col items-center justify-between"
              >
                <div className="avatar  placeholder mt-2">
                  <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
                    {player.currentPicture === null ? (
                      <span className="text-xl">P</span>
                    ) : (
                      <>
                        <img
                          src={
                            player.currentPicture === 'GREEN'
                              ? player.greenShirtpicture!
                              : player.whiteShirtpicture!
                          }
                          className="cursor-pointer"
                          onClick={() => {
                            prefetch(`/jogadores/${player.slug}`);
                            push(`/jogadores/${player.slug}`);
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>
                <h2 className="m-b-2 cursor-pointer">{player.name}</h2>
                <div className="w-full h-6 rounded-b-lg bg-[#14191F] flex px-2">
                  <p># {player.shirtNumber || '00'}</p>
                </div>
              </div>
            ))}
          </Suspense>
        </div>
        <Link className="link" href={`/jogadores`}>
          Ver todos os jogadores
        </Link>
      </div>
      <div className="divider my-3"></div>
      <div className="flex justify-center md:justify-start ">
        <HomePageGeneralRank rank={generalRank} />
      </div>
    </div>
  );
};

export { HomeComponent };
