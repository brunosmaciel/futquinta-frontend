import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { GeneralRankingAPIType, RecordRankingType } from '../../..';

export type Props = {
  players: RecordRankingType[];
};
const RecordRanking = ({ players }: Props) => {
  const { push } = useRouter();
  return (
    <div className="w-full flex justify-center md:justify-start">
      <table className="table ">
        {/* head */}
        <thead>
          <tr>
            <th>Atleta</th>
            <th className="">Aproveitamento</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => {
            return (
              <tr>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={player.picture} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold w-">{player.name}</div>
                    </div>
                  </div>
                </td>
                <td className="w-8 text-end">{player.record.toFixed(1)}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export { RecordRanking };
