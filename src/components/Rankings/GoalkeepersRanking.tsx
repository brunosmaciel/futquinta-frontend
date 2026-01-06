import Link from 'next/link';

import { PlayerProfile } from '../../..';
import { getGoalKeeperStats } from '../../functions/getGoalkeeperRank';

export type GeneralPlacingProps = {
  players: PlayerProfile[];
  numberOfGames: number;
};
const GoalkeepersRankings = ({ players, numberOfGames }: GeneralPlacingProps) => {
  const gamesFilter = Math.ceil(numberOfGames * (40 / 100));

  const playerStats = players
    .filter((player) => player.role !== 'GUEST')
    .map((player) => {
      const stats = getGoalKeeperStats(player);

      return {
        name: player.name,
        slug: player.slug,
        ...stats,
      };
    })

    .sort((a, b) => {
      return a.goalsConceded / a.totalGames > b.goalsConceded / b.totalGames ? 1 : -1;
    })
    .sort((a, b) => {
      if (
        a.goalsConceded / a.totalGames === b.goalsConceded / b.totalGames &&
        a.totalGames > b.totalGames
      )
        return -1;
      return 1;
    })
    .sort((a, b) => {
      if (
        a.goalsConceded / a.totalGames === b.goalsConceded / b.totalGames &&
        a.totalGames > b.totalGames
      )
        return -1;
      return 1;
    })
    .filter((player) => player.name !== 'Convidados')
    .filter((player) => player.averageGoalsPerGame > 0);
  const goalkeepers1 = playerStats.filter((player) => player.totalGames >= gamesFilter);
  const goalkeepers2 = playerStats.filter((player) => player.totalGames < gamesFilter);
  const goalkeepers = [...goalkeepers1, ...goalkeepers2];
  return (
    <div className="h-screen">
      <div className="h-11 justify-between mx-1 my-4 text-[12px] font-light italic flex  lg:justify-normal lg:gap-10 ">
        <div className="flex flex-col gap-2">
          <span>
            <b>Gols S*</b> Gols sofridos
          </span>
        </div>
      </div>
      <div className="overflow-x-auto ">
        {playerStats && (
          <table className="table  w-full max-w-3xl">
            {/* head */}
            <thead>
              <tr className="border-none">
                <th></th>
                <th>Atleta</th>
                <th>Média</th>
                <th>J</th>
                <th>Gols S</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {goalkeepers.map(
                ({ slug, name, goalsConceded, totalGames, averageGoalsPerGame }, i) => (
                  <tr
                    key={slug}
                    data-willbeawarded={i + 1 === 1}
                    className=" border-l-4  gap-2 transition-all hover data-[willbeawarded=true]:border-l-green-500 border-transparent "
                  >
                    <th className="w-16">{i + 1} °</th>
                    <td>
                      <Link href={`/jogadores/${slug}`} className="cursor-pointer">
                        {name}
                      </Link>
                    </td>
                    <td>{averageGoalsPerGame.toFixed(2)}</td>
                    <td>{totalGames}</td>
                    <td>{goalsConceded}</td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export { GoalkeepersRankings };
