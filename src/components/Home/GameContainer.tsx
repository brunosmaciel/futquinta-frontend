import { formatInTimeZone } from 'date-fns-tz';
import Link from 'next/link';

import { Game } from '../../..';

type GameContainerType = {
  game: Game;
};
export const GameContainer = ({ game }: GameContainerType) => {
  return (
    <div className="rounded-lg shadow-md bg-[#191D24] w-28 h-34  text-sm  p-2" key={game.id}>
      <div className="flex flex-col items-center gap-[2px]">
        <span>{formatInTimeZone(game.gameDate, 'America/Sao_Paulo', 'dd/MM')}</span>
        <span>19:15</span>
      </div>
      <div className="flex justify-center mt-2 gap-2 items-center">
        <p className="h-4 w-4 rounded-full bg-green-500"></p>
        <span className="w-[44px]">Verde</span>
        <span>{game.greenGoals}</span>
      </div>
      <div className="flex  mt-[2px] gap-2 justify-center  items-center ">
        <p className="h-4 w-4 rounded-full bg-white"></p>
        <div className="flex gap-2">
          <span>Branco</span>
          <span>{game.whiteGoals}</span>
        </div>
      </div>
      <div className="mt-2 flex justify-center">
        <Link className="link" href={`/jogos/${game.id}`}>
          Ver detalhes
        </Link>
      </div>
    </div>
  );
};
