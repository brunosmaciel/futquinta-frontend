import Link from 'next/link';

import { Game } from '../../..';

type GameContainerType = {
  games: Game[];
};
export const GameContainer = ({ games }: GameContainerType) => {
  return (
    <>
      <div className="flex flex-col items-center md:items-start gap-6">
        <h2 className="font-bold text-lg">Ultimas partidas</h2>
        <div className="flex flex-wrap justify-center gap-2 ">
          {games.slice(0, 3).map((game) => {
            return (
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
            );
          })}
        </div>
        <div>
          <Link className="link" href={`/jogos`}>
            Ver todos os jogos
          </Link>
        </div>
      </div>
    </>
  );
};
