import Link from 'next/link';

import { PlayerProfile } from '../../..';
import { getGoalKeeperStats } from '../../functions/getGoalkeeperRank';

export type GeneralPlacingProps = {
  players: PlayerProfile[];
};
const GoalkeepersRankings = ({ players }: GeneralPlacingProps) => {
  const playerStats = players
    .map((player) => {
      const stats = getGoalKeeperStats(player);

      return {
        name: player.name,
        slug: player.slug,

        ...stats,
      };
    })
    .sort((a, b) => {
      return a.goalsConceded / a.totalGames < b.goalsConceded / b.totalGames ? -1 : 1;
    })
    .sort((a, b) => {
      if (
        a.goalsConceded / a.totalGames === b.goalsConceded / b.totalGames &&
        a.totalGames > b.totalGames
      )
        return -1;
      return 1;
    });
  return (
    <div className="goalkeeper-rank-height">
      <div className="overflow-x-auto ">
        {playerStats && (
          <table className="table table-zebra w-full">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Atleta</th>
                <th>Média</th>
                <th>J</th>
                <th>Gols S</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {playerStats.map(({ slug, name, goalsConceded, totalGames }, i) => (
                <tr key={slug}>
                  <th>{i + 1}°</th>
                  <td>
                    <Link href={`/jogadores/${slug}`} className="cursor-pointer">
                      {name}
                    </Link>
                  </td>
                  <td>{(goalsConceded / totalGames).toFixed(2).replace('.', ',')}</td>
                  <td>{totalGames}</td>
                  <td>{goalsConceded}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export { GoalkeepersRankings };
