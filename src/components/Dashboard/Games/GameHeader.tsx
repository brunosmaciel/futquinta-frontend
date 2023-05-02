import { Game, PlayerProfile } from '../../../..';
import { AddPlayerToGameModal } from '../../AddPlayerToGameModal';
type GameHeaderProps = {
  game: Game;
  players: PlayerProfile[];
  team: 'WHITE' | 'GREEN';
};
export const GameHeader = ({ game, players, team }: GameHeaderProps) => {
  const bgColor = team === 'WHITE' ? 'bg-white' : 'bg-green-700';
  return (
    <>
      <div className="bg-base-100 p-4 flex items-center justify-between gap-10 text-xl overflow-x-hidden">
        <div className="flex items-center gap-10">
          <div className={`h-10 w-10 rounded-full  ${bgColor}`}></div>
          <h1 className="font-bold">{team === 'WHITE' ? 'Branco' : 'Verde'}</h1>
        </div>
        <div>
          <AddPlayerToGameModal currentTeam={team} game={game} players={players || []}>
            <label
              htmlFor={`my-modal-${team}`}
              className="flex items-center justify-center bg-neutral hover:bg-neutral-focus cursor-pointer w-10 h-10 rounded-full text-[25px] text-bold "
            >
              +
            </label>
          </AddPlayerToGameModal>
        </div>
      </div>
    </>
  );
};
