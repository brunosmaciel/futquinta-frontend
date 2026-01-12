import { PlayerProfile } from '../../..';
import { getTopScorers } from '../../functions/functions';
import { RankPositionTd } from '../ui/RankPositionTd';

export type GeneralPlacingProps = {
  players: PlayerProfile[];
};
const TopScorersRanking = ({ players }: GeneralPlacingProps) => {
  const topScorerRankingArray = getTopScorers(players);

  return (
    <>
      <div className="justify-between mx-1 my-4 text-[12px] font-light italic flex  lg:justify-normal lg:gap-10 ">
        <div className="flex flex-col gap-2">
          <span>
            <b>J*</b> Jogos
          </span>
          <span>
            <b>G*</b> Gols marcados
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span>
            <b>M*</b> Média de gols
          </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table  w-full max-w-3xl">
          {/* head */}
          <thead>
            <tr className="border-none">
              <th></th>
              <th>Nome</th>
              <th>J</th>
              <th>G</th>
              <th>M</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {topScorerRankingArray.map(({ id, name, goals, totalGames, goalsPerGame }, i) => (
              <tr key={id} className=" border-l-4 hover transition-all gap-2  ">
                <RankPositionTd awardPosition={5} index={i} />
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
