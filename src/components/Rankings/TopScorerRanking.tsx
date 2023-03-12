import { PlayerProfile } from '../../..';

export type GeneralPlacingProps = {
  players: PlayerProfile[];
};
const TopScorersRanking = ({ players }: GeneralPlacingProps) => {
  const getNumberOfGames = (vic: number, def: number, draw: number): number => {
    const games = vic + def + draw;

    return games;
  };
  const getAveragingGoals = (vic: number, def: number, draw: number, goals: number): string => {
    const games = getNumberOfGames(vic, def, draw);

    const averagingGoals = (goals / games).toFixed(2);
    if (+averagingGoals === Infinity) {
      return '0,00';
    }
    if (Number.isNaN(+averagingGoals)) {
      return '0,00';
    }
    if (averagingGoals.length === 2) {
      return averagingGoals + '0'.replace('.', ',');
    }
    if (averagingGoals.length === 1) {
      return averagingGoals + '0'.replace('.', ',');
    }
    if (averagingGoals === '0') {
      return averagingGoals.replace('.', ',');
    }

    return averagingGoals.replace('.', ',');
  };

  const outfieldPlayers = players.filter((player) => player.function === 'OUTFIELDPLAYER');
  return (
    <>
      <div className="overflow-x-auto">
        {players && (
          <table className="table table-zebra w-full">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Nome</th>
                <th>Gols</th>
                <th>Jogos</th>
                <th>Media</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {outfieldPlayers &&
                outfieldPlayers
                  .filter((player) => player.function === 'OUTFIELDPLAYER')
                  .map((player, i) => (
                    <tr key={player.id}>
                      <th>{i + 1}</th>
                      <td>{player.name}</td>
                      <td>{player.goals}</td>
                      <td>{getNumberOfGames(player.victories, player.defeats, player.draws)}</td>
                      <td>
                        {getAveragingGoals(
                          player.victories,
                          player.defeats,
                          player.draws,
                          player.goals
                        )}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export { TopScorersRanking };
