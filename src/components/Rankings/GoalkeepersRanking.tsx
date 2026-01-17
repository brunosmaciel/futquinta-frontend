import Link from 'next/link';

import { PlayerProfile } from '../../..';
import { getGoalKeeperStats } from '../../functions/getGoalkeeperRank';
import { RankPositionTd } from '../ui/RankPositionTd';

export type GeneralPlacingProps = {
  players: PlayerProfile[];
  numberOfGames: number;
};

type GoalkeeperRank = {
  name: string;
  slug: string;
  goalsConceded: number;
  totalGames: number;
  gamesRecord: number;
  averageGoalsPerGame: number;
};

const GoalkeepersRankings = ({ players, numberOfGames }: GeneralPlacingProps) => {
  const minimumGames = Math.ceil(numberOfGames * 0.4);

  const goalkeepers = players
    // ❌ remove convidados
    .filter((player) => player.role !== 'GUEST' && player.name !== 'Convidados')
    // 📊 calcula stats
    .map<GoalkeeperRank>((player) => {
      const stats = getGoalKeeperStats(player);

      return {
        name: player.name,
        slug: player.slug,
        goalsConceded: stats.goalsConceded,
        totalGames: stats.totalGames,
        gamesRecord: stats.gamesRecord,
        averageGoalsPerGame: stats.averageGoalsPerGame,
      };
    })
    // ❌ remove quem não tem média válida
    .filter((player) => player.averageGoalsPerGame > 0)
    // 🏆 ranking
    .sort((a, b) => {
      // 1️⃣ menor média de gols sofridos
      if (a.averageGoalsPerGame !== b.averageGoalsPerGame) {
        return a.averageGoalsPerGame - b.averageGoalsPerGame;
      }

      // 2️⃣ mais jogos
      if (a.totalGames !== b.totalGames) {
        return b.totalGames - a.totalGames;
      }

      // 3️⃣ melhor retrospecto
      return b.gamesRecord - a.gamesRecord;
    });

  // 🔀 separação por número mínimo de jogos
  const qualified = goalkeepers.filter((p) => p.totalGames >= minimumGames);
  const notQualified = goalkeepers.filter((p) => p.totalGames < minimumGames);

  const rankedGoalkeepers = [...qualified, ...notQualified];

  return (
    <div className="h-screen">
      <div className="mx-1 my-4 flex h-11 justify-between text-[12px] font-light italic lg:justify-normal lg:gap-10">
        <span>
          <b>Gols S*</b> Gols sofridos
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full max-w-3xl">
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
            {rankedGoalkeepers.map(
              ({ slug, name, goalsConceded, totalGames, averageGoalsPerGame }, index) => (
                <tr
                  key={slug}
                  data-willbeawarded={index === 0}
                  className="gap-2 border-l-4 border-transparent transition-all hover:data-[willbeawarded=true]:border-l-green-500"
                >
                  <RankPositionTd awardPosition={1} index={1} />

                  <td>{name}</td>
                  <td>{averageGoalsPerGame.toFixed(2)}</td>
                  <td>{totalGames}</td>
                  <td>{goalsConceded}</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { GoalkeepersRankings };
