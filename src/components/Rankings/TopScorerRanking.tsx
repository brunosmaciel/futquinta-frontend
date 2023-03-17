import { PlayerProfile } from '../../..';
import { getTopScorers } from '../../functions/functions';
import { getPlayerStats } from '../../functions/getPlayerStats';

export type GeneralPlacingProps = {
  players: PlayerProfile[];
};
const TopScorersRanking = ({ players }: GeneralPlacingProps) => {
  const topScorerRankingArray = getTopScorers(players);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Nome</th>
              <th>Jogos</th>
              <th>Gols</th>
              <th>Media</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {topScorerRankingArray.map(({ id, name, goals, totalGames, goalsPerGame }, i) => (
              <tr key={id}>
                <th>{i + 1}</th>
                <td>{name}</td>
                <td>{totalGames}</td>
                <td>{goals}</td>
                <td>{goalsPerGame.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export { TopScorersRanking };
