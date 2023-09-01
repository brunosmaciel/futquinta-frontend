import { useForm } from 'react-hook-form';

import { addHours } from 'date-fns';

import { PlayerProfile } from '../../../..';
import { Button } from '../../Button';
import { ChoseTeam } from './ChoseTeam';
export type ChoseTeamProps = {
  players: PlayerProfile[];
  currentGameDate: string;
  handleStartGame: (newGameDate?: string) => void;
  isLoading: boolean;
};

type Inputs = {
  gameDate: Date;
  filter: string;
  showGuest: boolean;
};
export const ChoseTeamWrapper = ({ players, handleStartGame, isLoading }: ChoseTeamProps) => {
  const { register, watch } = useForm<Inputs>();
  const gameDate = watch('gameDate');
  const isShowingGuests = watch('showGuest');
  const filterValue = watch('filter');

  const filteredPlayers = players.filter((player) => {
    if (isShowingGuests) return player;

    return player.role === 'PERMANENT';
  });

  return (
    <div className=" flex flex-col w-full">
      <div className="self-center w-full flex flex-col items-center gap-4">
        <Button
          isLoading={isLoading}
          className="btn btn-primary"
          onClick={() => handleStartGame(`${addHours(gameDate, 12)}`)}
        >
          Iniciar partida
        </Button>
        <div className=" w-full flex gap-2 justify-center items-center">
          <input
            {...register('filter')}
            type="text"
            id="filter-input"
            placeholder="Digite o nome"
            className="input input-primary w-full max-w-xs"
          />
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              className="checkbox checkbox-neutral"
              {...register('showGuest')}
            />
            <span className="label-text">Mostrar convidados</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-10">
        <div className="flex-1">
          <h1 className="text-xl flex items-center gap-2 border-b-[1px]  py-2">
            {' '}
            <p className="w-6 h-6 rounded-full bg-white"></p>Equipe Branca
          </h1>
          {filterValue ? (
            <>
              {filteredPlayers
                .sort((a, b) => (a.name < b.name ? 1 : -1))
                .sort((a, b) => (a.function > b.function ? 1 : -1))
                .filter((player) => player.name.includes(filterValue.charAt(0).toUpperCase()))
                .map((player) => (
                  <ChoseTeam key={player.id} player={player} team={'WHITE'} />
                ))}
            </>
          ) : (
            <>
              {players
                .sort((a, b) => (a.name < b.name ? 1 : -1))
                .sort((a, b) => (a.function > b.function ? 1 : -1))
                .map((player) => (
                  <ChoseTeam key={player.id} player={player} team={'WHITE'} />
                ))}
            </>
          )}
        </div>
        <div className="flex-1">
          <h1 className="text-xl flex items-center gap-2 border-b-[1px]  py-2">
            {' '}
            <p className="w-6 h-6 rounded-full bg-green-800 "></p>Equipe Verde
          </h1>
          {filterValue ? (
            <>
              {filteredPlayers
                .sort((a, b) => (a.name < b.name ? 1 : -1))
                .sort((a, b) => (a.function > b.function ? 1 : -1))
                .filter((player) => player.name.includes(filterValue.charAt(0).toUpperCase()))
                .map((player) => (
                  <ChoseTeam key={player.id} player={player} team={'GREEN'} />
                ))}
            </>
          ) : (
            <>
              {players
                .sort((a, b) => (a.name < b.name ? 1 : -1))
                .sort((a, b) => (a.function > b.function ? 1 : -1))
                .map((player) => (
                  <ChoseTeam key={player.id} player={player} team={'GREEN'} />
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
