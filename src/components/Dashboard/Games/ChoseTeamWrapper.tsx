import { PlayerProfile } from '../../../..';
import { ChoseTeam } from './ChoseTeam';
export type ChoseTeamProps = {
  players: PlayerProfile[];

  handleStartGame: () => void;
};
export const ChoseTeamWrapper = ({ players, handleStartGame }: ChoseTeamProps) => {
  return (
    <div className=" flex flex-col w-full">
      <div className="self-center flex flex-col items-center gap-2">
        <h1 className=" self-center text-3xl ">Selecione os times</h1>
        <button className="btn btn-primary" onClick={handleStartGame}>
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
