import { useForm } from 'react-hook-form';

import { formatInTimeZone } from 'date-fns-tz';

import { PlayerProfile } from '../../../..';
import { Button } from '../../Button';
import { ChoseTeam } from './ChoseTeam';
export type ChoseTeamProps = {
  players: PlayerProfile[];
  currentGameDate: string;
  handleStartGame: (newGameDate?: string) => void;
  loadingClass: string;
};

type Inputs = {
  gameDate: Date;
};
export const ChoseTeamWrapper = ({
  players,
  handleStartGame,
  currentGameDate,
  loadingClass,
}: ChoseTeamProps) => {
  const { register, watch } = useForm<Inputs>();
  const gameDate = watch('gameDate');

  return (
    <div className=" flex flex-col w-full">
      <div className="self-center w-full flex flex-col items-center gap-4">
        <div className="flex flex-col cursor-pointer">
          <input
            {...register('gameDate', {
              valueAsDate: true,
            })}
            type="date"
            id="gameDate"
            lang="pt-BR"
            className="input input-date text-white cursor-pointer"
            defaultValue={formatInTimeZone(currentGameDate, 'America/Sao_Paulo', 'yyyy-MM-dd')}
          />

          <h1 className=" text-3xl ">Selecione os times</h1>
        </div>
        <Button
          loadingClass={loadingClass}
          className="btn btn-primary"
          onClick={() => handleStartGame(gameDate.toISOString())}
        >
          Iniciar partida
        </Button>
      </div>
      <div className="flex flex-wrap gap-10">
        <div className="flex-1">
          <h1 className="text-xl flex items-center gap-2 border-b-[1px]  py-2">
            {' '}
            <p className="w-6 h-6 rounded-full bg-white"></p>Equipe Branca
          </h1>
          {players.map((player) => (
            <ChoseTeam key={player.id} player={player} team={'WHITE'} />
          ))}
        </div>

        <div className="flex-1">
          <h1 className="text-xl flex items-center gap-2 border-b-[1px]  py-2">
            {' '}
            <p className="w-6 h-6 rounded-full bg-green-800 "></p>Equipe Verde
          </h1>
          {players?.map((player) => (
            <ChoseTeam key={player.id} player={player} team={'GREEN'} />
          ))}
        </div>
      </div>
    </div>
  );
};
