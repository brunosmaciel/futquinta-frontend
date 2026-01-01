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
        {team === 'GREEN' ? 'Time Preto' : 'Time Branco'}
      </option>
      {players.map((player) => (
        <option
          key={player.id}
          value={JSON.stringify({
            id: player.id,
            function: player.playerPosition,
            name: player.name,
            shirtNumber: String(player.shirtNumber || '00'),
          })}
        >
          {player.name}
        </option>
      ))}
    </select>
  );
};
