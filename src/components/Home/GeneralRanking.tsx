import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { GeneralRankingAPIType } from '../../..';

export type Props = {
  players: GeneralRankingAPIType[];
};
const GeneralRanking = ({ players }: Props) => {
  const { push } = useRouter();

  return (
    <div className=" w-full flex justify-center md:justify-start">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Atleta</th>
            <th className="w-12 ">Pontos</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => {
            return (
              <tr key={player.name}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={player.picture} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{player.name}</div>
                    </div>
                  </div>
                </td>
                <td className="text-end">{player.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export { GeneralRanking };
