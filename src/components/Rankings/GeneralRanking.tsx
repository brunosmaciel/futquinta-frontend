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
              {playersGeneralRanking.map(({ slug, name, totalGames, points, gamesRecord }, i) => (
                <tr key={slug}>
                  <th>{i + 1}</th>
                  <td>{name}</td>
                  <td>{points}</td>
                  <td>{totalGames}</td>
                  <td>{totalGames * 3}</td>
                  <td>{gamesRecord.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export { GeneralRanking };
