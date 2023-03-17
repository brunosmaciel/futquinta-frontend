import Link from 'next/link';

import { PlayerProfile } from '../../..';
import { getPlayerStats } from '../../functions/getPlayerStats';

export type GeneralPlacingProps = {
  players: PlayerProfile[];
};
const MOTMRanking = ({ players }: GeneralPlacingProps) => {
  const playerStats = players
    .map((player) => {
      const stats = getPlayerStats(player);

      return {
        name: player.name,
        slug: player.slug,
        ...stats,
      };
    })
    .sort((a, b) => (a.mvp > b.mvp ? -1 : 1))
    .sort((a, b) => {
      if (a.mvp === b.mvp && a.totalGames < b.totalGames) return -1;

      return 1;
    });

  return (
    <>
      <div className="overflow-x-auto">
        {playerStats && (
          <table className="table table-zebra w-full">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Atleta</th>
                <th>Pontos</th>
                <th>Jogos</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {playerStats.map(({ slug, name, mvp, totalGames }, i) => (
                <tr key={slug}>
                  <th>{i + 1}°</th>
                  <td>
                    <Link href={`/jogadores/${slug}`} className="cursor-pointer">
                      {name}
                    </Link>
                  </td>
                  <td>{mvp}</td>
                  <td>{totalGames}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export { MOTMRanking };
