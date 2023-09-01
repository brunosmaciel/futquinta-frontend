import { PlayerProfile } from '../../../';
import { getGeneralRanking } from '../../functions/getGeneralRanking';

export type GeneralPlacingProps = {
  players: PlayerProfile[];
};
const GeneralRanking = ({ players }: GeneralPlacingProps) => {
  const playersGeneralRanking = getGeneralRanking(players);
  return (
    <>
      <div className="justify-between mx-1 my-4 text-[12px] font-light italic flex  lg:justify-normal lg:gap-10 ">
        <div className="flex flex-col gap-2">
          <span>
            <b>PD*</b> pontos disputados
          </span>
          <span>
            <b>PG*</b> pontos ganhos
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span>
            <b>Vitoria*</b> 3 pontos
          </span>
          <span>
            <b>Empate*</b> 1 pontos
          </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        {playersGeneralRanking && (
          <table className="table w-full max-w-3xl ">
            {/* head */}
            <thead>
              <tr className="border-none">
                <th></th>
                <th>Atleta</th>
                <th>PG</th>
                <th>J</th>
                <th>PD</th>
                <th>Aprov</th>
              </tr>
            </thead>
            <tbody className="">
              {playersGeneralRanking
                .filter((player) => player.name !== 'Convidados')
                .map(({ slug, name, totalGames, points, gamesRecord }, i) => (
                  <tr
                    data-willbeawarded={i + 1 <= 5}
                    key={slug}
                    className=" border-l-4  gap-2 hover transition-all data-[willbeawarded=true]:border-l-green-500 border-transparent "
                  >
                    <th className="w-16 ">{i + 1} °</th>
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
