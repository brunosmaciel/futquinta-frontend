import { PlayerProfile } from '../..';

export type SelectPlayerProps = {
  handleTeamSelection: (e: any, currentTeam: 'GREEN' | 'WHITE') => void;
  players: PlayerProfile[];
  team: 'GREEN' | 'WHITE';
};

export const SelectPlayers = ({ team, handleTeamSelection, players }: SelectPlayerProps) => {
  return (
    <select
      className="select select-bordered select-sm w-full max-w-xs"
      onChange={(e) => handleTeamSelection(e, team)}
      value={team}
    >
      <option defaultValue={team.toLocaleLowerCase().slice(0, 1)[0].toUpperCase()}>
        {team === 'GREEN' ? 'Time Verde' : 'Time Branco'}
      </option>
      {players.map((player) => (
        <option
          key={player.id}
          value={JSON.stringify({
            id: player.id,
            function: player.function,
            name: player.name,
          })}
        >
          {player.name}
        </option>
      ))}
    </select>
  );
};
