import useSWR from 'swr';
import { PlayerProfile } from '../../..';
import { getTopScorers } from '../../functions/functions';
import { LoadingSpin } from '../Loading';

export type GeneralPlacingProps = {
  players: PlayerProfile[];
};
type GerenalRankApi = {
  id: number;
  name: string;
  slug: string;
  record: number;
  games: number;
  picture: string;
};
const RecordRanking = () => {
  const { data, isLoading } = useSWR<GerenalRankApi[]>('/rankings/record');
  if (isLoading) {
    return <LoadingSpin />;
  }
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
              <th>Aprov</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data?.map(({ id, name, games, record, slug }, i) => (
              <tr
                key={id}
                data-willbeawarded={i + 1 <= 5}
                className=" border-l-4 hover transition-all gap-2  data-[willbeawarded=true]:border-l-green-500 border-transparent "
              >
                <th className="w-16">{i + 1} °</th>
                <td>{name}</td>
                <td>{games}</td>
                <td>{record.toFixed(2)} %</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export { RecordRanking };
