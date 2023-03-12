import Link from 'next/link';

import { PlayerProfile } from '../../../';
import { getGeneralRanking } from '../../functions/getGeneralRanking';

export type GeneralPlacingProps = {
  players: PlayerProfile[];
};
const GeneralRanking = ({ players }: GeneralPlacingProps) => {
  const playersGeneralRanking = getGeneralRanking(players);
  return (
    <>
      <div className="overflow-x-auto">
        {playersGeneralRanking && (
          <table className="table table-zebra w-full">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Atleta</th>
                <th>PG</th>
                <th>J</th>
                <th>PD</th>
                <th>Aprov</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {playersGeneralRanking.map(
                ({ slug, name, games, pointsDisputed, pointsEarned, record }, i) => (
                  <tr key={slug}>
                    <th>{i + 1}°</th>
                    <td>
                      <Link href={`/jogadores/${slug}`} className="cursor-pointer">
                        {name}
                      </Link>
                    </td>
                    <td>{pointsEarned}</td>
                    <td>{games}</td>
                    <td>{pointsDisputed}</td>
                    <td>{record.toFixed(1)}%</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export { GeneralRanking };
