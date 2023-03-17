import { ImCalendar } from 'react-icons/im';

import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { Game } from '../../..';
import { GameScore } from '../../components/Dashboard/GameScore';
import { LoadingSpin } from '../../components/Loading';
import FourOhFour from '../404';
const Jogo = () => {
  const {
    query: { id },
  } = useRouter();

  const { data, isLoading, error } = useSWR<Game>(`/games/${id}`);

  if (error) {
    return <FourOhFour />;
  }
  if (isLoading) {
    return <LoadingSpin />;
  }
  if (data) {
    const whiteMOTM = data.MOTM.filter((player) => player.team === 'WHITE')[0];
    const greenMOTM = data.MOTM.filter((player) => player.team === 'GREEN')[0];

    const whitePlayers = data.players
      .filter((player) => player.currentTeam === 'WHITE')
      .sort((a, b) => {
        if (a.function < b.function) return -1;
        if (a.function > b.function) return 0;
        return 1;
      });
    const greenPlayers = data.players
      .filter((player) => player.currentTeam === 'GREEN')
      .sort((a, b) => {
        if (a.function < b.function) return -1;
        if (a.function > b.function) return 0;
        return 1;
      });

    return (
      <>
        <Head>
          <meta
            property="og:title"
            content={`Verde ${data.greenGoals} x Branco ${data.whiteGoals}`}
          />
          <meta property="og:image" content={data.gamePicture || ''} />
        </Head>
        <div className="flex flex-col items-center">
          {data.gamePicture && (
            <>
              <Image
                alt="alt"
                src={data.gamePicture}
                className="w-max border-[1px] rounded-lg"
                width={320}
                height={30}
                quality={100}
              />
            </>
          )}

          {/*//TODO add this code later */
          /*  */}
          <GameScore game={data} />
          {data.MOTM.length >= 2 && (
            <>
              <div className=" flex w-96 flex-col self-center items-center gap-4 ">
                <h1 className="font-bold text-xl">Melhores da partida</h1>
                <div className="w-[90%] h-22 bg-[#131A21] flex rounded-2xl justify-between px-4 py-2 ">
                  <div className="flex items-center gap-2">
                    <img
                      src={
                        whiteMOTM.player.whiteShirtpicture ||
                        `https://ui-avatars.com/api/?name=${whiteMOTM.player.slug}?bold=true`
                      }
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    <h1>{whiteMOTM.player.name}</h1>
                  </div>
                  <div className="bg-white w-[2px]"></div>
                  <div className="flex items-center gap-2">
                    <h1>{greenMOTM.player.name}</h1>
                    <img
                      src={
                        greenMOTM.player.greenShirtpicture ||
                        `https://ui-avatars.com/api/?name=${greenMOTM.player.slug}?bold=true`
                      }
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
          <div className=" mt-5 w-[95%] lg:w-[70%] flex gap-2 items-center">
            <ImCalendar />
            <p>
              <i>{new Date(data.createdAt).toLocaleDateString('pt-BR').slice(0, 10)}</i>
            </p>
          </div>
          <div className="w-[95%] lg:w-[70%] my-8">
            <div className="border border-base-300 bg-base-100 p-4 flex items-center gap-10 text-xl overflow-x-hidden">
              <div className="h-10 w-10 rounded-full bg-white"></div>
              <h1 className="font-bold">Branco</h1>
            </div>
            {whitePlayers.map(
              ({
                name,
                id,
                goals,
                substituition,
                function: playerFunction,
                player: { whiteShirtpicture, slug },
              }) => (
                <div className="collapse collapse-arrow" key={id}>
                  <input type="checkbox" className="peer" />
                  <div className="collapse-title bg-base-100 border border-base-300  text-primary-content peer-checked:bg-base-300 peer-checked:text-base-300-content">
                    <div className="avatar placeholder flex gap-8 items-center">
                      <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                        <img
                          src={
                            whiteShirtpicture ||
                            `https://ui-avatars.com/api/?name=${slug}?bold=true`
                          }
                          alt="Avatar do jogador"
                        />
                      </div>
                      <h1 className="text-[16px]">{name}</h1>
                    </div>
                  </div>
                  {/* // ? Collapse Content */}
                  <div className="collapse-content bg-base-100 text-primary-content peer-checked:bg-base-300 peer-checked:text-base-300-content pl-18 gap-2 flex justify-center">
                    <div className="bg-[#191D24]  w-[100px] h-[68px]  p-2 rounded-lg flex flex-col items-center ">
                      {playerFunction === 'GOALKEEPER' ? (
                        <>
                          <span className="text-sm">Gols S</span>
                          <span className="text-xl font-bold">{data.greenGoals}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-sm">Gols</span>
                          <span className="text-xl font-bold">{goals}</span>
                        </>
                      )}
                    </div>
                    <div className="bg-[#191D24]  w-[100px] h-[68px]  p-2 rounded-lg flex flex-col items-center ">
                      <span className="text-sm">Substituições</span>
                      <span className="text-xl font-bold">{substituition}</span>
                    </div>
                  </div>
                </div>
              )
            )}
            <div className="border border-base-300 bg-base-100 p-4 flex items-center gap-10 text-xl overflow-x-hidden">
              <div className="h-10 w-10 rounded-full bg-green-600"></div>
              <h1 className="font-bold">Verde</h1>
            </div>
            {greenPlayers.map(
              ({
                name,
                id,
                goals,
                substituition,
                function: playerFunction,
                player: { greenShirtpicture, slug },
              }) => (
                <div className="collapse collapse-arrow" key={id}>
                  <input type="checkbox" className="peer" />
                  <div className="collapse-title bg-base-100 border border-base-300  text-primary-content peer-checked:bg-base-300 peer-checked:text-base-300-content">
                    <div className="avatar placeholder flex gap-8 items-center">
                      <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                        <img
                          src={
                            greenShirtpicture ||
                            `https://ui-avatars.com/api/?name=${slug}?bold=true`
                          }
                          alt="Avatar do jogador"
                        />
                      </div>
                      <h1 className="text-[16px]">{name}</h1>
                    </div>
                  </div>
                  {/* // ? Collapse Content */}
                  <div className="collapse-content bg-base-100 text-primary-content peer-checked:bg-base-300 peer-checked:text-base-300-content pl-18 gap-2 flex justify-center">
                    <div className="bg-[#191D24]  w-[100px] h-[68px]  p-2 rounded-lg flex flex-col items-center ">
                      {playerFunction === 'GOALKEEPER' ? (
                        <>
                          <span className="text-sm">Gols S</span>
                          <span className="text-xl font-bold">{data.whiteGoals}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-sm">Gols</span>
                          <span className="text-xl font-bold">{goals}</span>
                        </>
                      )}
                    </div>
                    <div className="bg-[#191D24]  w-[100px] h-[68px]  p-2 rounded-lg flex flex-col items-center ">
                      <span className="text-sm">Substituições</span>
                      <span className="text-xl font-bold">{substituition}</span>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </>
    );
  }
};

export default Jogo;
