import { useForm } from 'react-hook-form';

import { PlayerProfile } from '../../../..';
import { ChoseTeam } from './ChoseTeam';
export type ChoseTeamProps = {
  players: PlayerProfile[];
  currentGameDate: Date;
  handleStartGame: (newGameDate?: Date) => void;
};

type Inputs = {
  gameDate: Date;
};
export const ChoseTeamWrapper = ({ players, handleStartGame, currentGameDate }: ChoseTeamProps) => {
  const { register, watch } = useForm<Inputs>();
  const gameDate = watch('gameDate');

  return (
    <div className=" flex flex-col w-full">
      <div className="self-center w-full flex flex-col items-center gap-4">
        <div className="flex flex-col ">
          <input
            {...register('gameDate', {
              valueAsDate: true,
            })}
            type="date"
            id="gameDate"
            lang="pt-BR"
            className="input input-date text-white"
            defaultValue={new Date(currentGameDate).toISOString().slice(0, 10)}
          />

          <h1 className=" text-3xl ">Selecione os times</h1>
        </div>
        <button className="btn btn-primary" onClick={() => handleStartGame(gameDate)}>
          Iniciar partida
        </button>
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
