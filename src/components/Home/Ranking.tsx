import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { GeneralRankingAPIType } from '../../..';

export type Props = {
  players: GeneralRankingAPIType[];
};
const Ranking = ({ players }: Props) => {
  const { push } = useRouter();

  return (
    <div className="flex justify-center md:justify-start ">
      <div className="overflow-x-auto ">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Nome</th>
              <th>Pontos</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => {
              return (
                <tr key={player.slug}>
                  <td>{player.position}</td>
                  <td className="w-96">
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12 cursor-pointer">
                          <img
                            src={
                              player.picture || `https://ui-avatars.com/api/?name=${player.slug}`
                            }
                            alt="Avatar"
                            onClick={() => push(`/jogadores/${player.slug}`)}
                          />
                        </div>
                      </div>
                      <div>
                        <Link href={`/jogadores/${player.slug}`} className="font-bold ">
                          {player.name}
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">{player.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="text-center ">
          <Link className="link mx-2 " href="/rankings">
            Ver tabela completa
          </Link>
        </div>
      </div>
    </div>
  );
};

export { Ranking };
