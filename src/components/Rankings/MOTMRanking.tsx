import Link from 'next/link';

import { PlayerProfile } from '../../..';
import { getPlayerStats } from '../../functions/getPlayerStats';

export type GeneralPlacingProps = {
  players: PlayerProfile[];
  totalNumberOfGames: number;
};
const MOTMRanking = ({ players, totalNumberOfGames }: GeneralPlacingProps) => {
  const fortyPerCentGames = Math.floor(totalNumberOfGames * 0.4);

  const playerStats = players
    .filter((player) => player.role === 'PERMANENT')
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
    })
    .filter((player) => player.mvp > 0)
    .filter((player) => player.totalGames >= fortyPerCentGames);

  return (
    <div className="h-full w-full">
      <div className="justify-between mx-1 my-4 text-[12px] font-light italic flex  lg:justify-normal lg:gap-10 ">
        <div className="h-[44px] invisible flex flex-col gap-2"></div>
      </div>
      <div className="overflow-x-auto">
        {playerStats && (
          <table className="table  w-full max-w-3xl">
            {/* head */}
            <thead>
              <tr className="border-none">
                <th></th>
                <th>Atleta</th>
                <th>Votos</th>
                <th>Jogos</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {playerStats.map(({ slug, name, mvp, totalGames }, i) => (
                <tr
                  key={slug}
                  data-willbeawarded={i + 1 <= 1}
                  className=" border-l-4  gap-2 hover transition-all data-[willbeawarded=true]:border-l-green-500 border-transparent "
                >
                  <th className="w-16">{i + 1} °</th>
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
    </div>
  );
};

export { MOTMRanking };
