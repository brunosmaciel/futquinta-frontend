import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import useSWR from 'swr';

import { Game, PlayerProfile } from '../../..';
import { LoadingSpin } from '../../components/Loading';
const Dashboard = () => {
  const { push } = useRouter();
  const { data: players, isLoading } = useSWR<PlayerProfile[]>('/players');
  const { data: games } = useSWR<Game[]>('/games');
  if (isLoading) {
    return <LoadingSpin />;
  }
  if (!isLoading) {
    return (
      <div className="mx-2   mt-16">
        <div className="dashboard-players-grid  w-full my-4">
          {players?.slice(0, 3).map((player) => (
            <div
              key={player.id}
              className=" bg-[#191D24] w-32 h-36 rounded-lg flex flex-col items-center justify-between"
            >
              <div className="avatar  placeholder mt-2">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
                  {player.currentPicture === null ? (
                    <span className="text-xl">P</span>
                  ) : (
                    <>
                      <img
                        src={player.currentPicture}
                        className="cursor-pointer"
                        onClick={() => push(`/dashboard/jogadores/${player.id}`)}
                      />
                    </>
                  )}
                </div>
              </div>
              <h2 className="m-b-2 cursor-pointer">{player.name}</h2>
              <div className="w-full h-6 rounded-b-lg bg-[#14191F] flex px-2">
                <p>#{player.id}</p>
              </div>
            </div>
          ))}
        </div>
        <Link className="link mt-32" href={'/dashboard/jogadores'}>
          Ver todos os jogadores
        </Link>
        <div className="divider"></div>
        <div>
          <div className="dashboard-players-grid  w-full my-4">
            {games?.slice(0, 3).map((game) => (
              <div
                key={game.id}
                className=" bg-[#191D24] w-32 h-36 rounded-lg flex flex-col items-center justify-between"
              >
                <div className="w-full flex p-2 gap-2 items-center justify-center text-[14px]">
                  <span>{new Date(game.createdAt).toLocaleDateString('pt-BR').slice(0, 5)}</span>
                  <span>19:15</span>
                </div>
                <div className="flex flex-col">
                  <div className="w-full flex p-2 gap-2 items-center">
                    <div className="w-4 h-4 bg-green-700 rounded-full"></div>
                    <div className="flex gap-2 text-[14px]">
                      <span className="w-[45px]">Verde</span>
                      <span>{game.greenGoals}</span>
                    </div>
                  </div>
                  <div className="w-full flex p-2 gap-2 items-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                    <div className="flex gap-2 text-[14px] ">
                      <span className="w-[45px]">Branco</span>
                      <span>{game.whiteGoals}</span>
                    </div>
                  </div>
                </div>
                <div className="w-full h-6 rounded-b-lg bg-[#14191F] flex px-2">
                  <Link href={`/dashboard/jogos/${game.id}`} className="text-[14px] link">
                    Ver mais
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Link className="link mt-32" href={'/dashboard/jogos'}>
          Ver todos os jogos
        </Link>
      </div>
    );
  }
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Dashboard;
