/* eslint-disable @next/next/no-img-element */
import { useCallback } from 'react';
import { champions } from '../../../public/campeoes';

import { formatInTimeZone } from 'date-fns-tz';
import { CalendarIcon, ShirtIcon } from 'lucide-react';
import Head from 'next/head';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import useSWR from 'swr';

import { Game } from '../../..';
import { Score } from '../../components/Game/Score';
import { LoadingSpin } from '../../components/Loading';
import BallIcon from '../../components/ui/BallIcon';
import { profilePicturePlaceholder } from '../../utils/profilePicturePlaceholder';
import FourOhFour from '../404';
import { cn } from '../../utils/cn';
const Jogo = () => {
  const { get } = useSearchParams();
  const id = get('id');
  const { push } = useRouter();

  const { data, isLoading, error } = useSWR<Game>(`/games/${id}`);
  const getWhitePlayers = useCallback(
    (data: Game) => {
      const filtered = data.players
        .filter((player) => player.currentTeam === 'WHITE')
        .sort((a, b) => {
          if (a.function < b.function) return -1;
          if (a.function > b.function) return 0;
          return 1;
        });
      return filtered;
    },
    [data]
  );
  const getGreenPlayers = useCallback(
    (data: Game) => {
      const filtered = data.players
        .filter((player) => player.currentTeam === 'GREEN')
        .sort((a, b) => {
          if (a.function < b.function) return -1;
          if (a.function > b.function) return 0;
          return 1;
        });
      return filtered;
    },
    [data]
  );
  if (error) {
    return <FourOhFour />;
  }
  if (isLoading) {
    return <LoadingSpin />;
  }
  if (data) {
    const whiteMOTM = data.MOTM.find((player) => player.team === 'WHITE');
    const greenMOTM = data.MOTM.find((player) => player.team === 'GREEN');

    const whitePlayers = getWhitePlayers(data);
    const greenPlayers = getGreenPlayers(data);

    return (
      <>
        <Head>
          <title>{`Branco ${data.whiteGoals} x ${data.greenGoals} Preto`}</title>
          <meta property="og:url" content={`/jogos/${data.id}`} />
          <meta property="og:type" content="blog" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="og:image:width" content="300" />
          <meta property="og:image:height" content="300" />
        </Head>
        <div className="flex flex-col items-center">
          {data.gamePicture && (
            <div className="p-2 w-full max-w-[520px] rounded-lg h-auto mx-auto">
              <Image
                priority
                className="w-full h-full rounded-md drop-shadow-lg"
                src={data.gamePicture}
                alt="Foto da partida"
                width={768}
                height={768}
              />
            </div>
          )}
          <div className=" mt-4 gap-2 w-full flex items-center justify-center">
            <span className="text-2xl font-bold">
              Rodada <span className="border-b-2 border-primary">{data.fixture}</span>
            </span>
          </div>
          <div className=" mt-4 gap-2 w-full flex items-center justify-center">
            <CalendarIcon size={20} />
            <span>{formatInTimeZone(data.gameDate, 'America/Sao_Paulo', 'dd/MM/yyyy')}</span>
          </div>

          <Score greenGoals={data?.greenGoals} whiteGoals={data?.whiteGoals} />

          <div className="flex flex-col lg:flex-row mt-4 h-full w-full">
            <div className="p-2 w-full lg:w-1/2">
              <div className="w-full  p-2 flex items-center gap-4 font-bold ">
                <div className="h-10 w-10 bg-secondary rounded-full"></div>
                <span className="text-xl">Branco</span>
              </div>
              {whitePlayers.map((player) => (
                <div
                  key={player.id}
                  onClick={() => push(`/jogadores/${player.player.slug}`)}
                  className=" transition-all hover:translate-y-1 cursor-pointer my-2 hover:bg-base-200 rounded-md p-2 flex items-center gap-4"
                >
                  <div
                    className={`avatar ${champions.map((tournamentPlayers) =>
                      tournamentPlayers.id === player.id
                        ? cn('border-[#ffbf00] border-2 rounded-3xl')
                        : null
                    )}`}
                  >
                    <div className="w-16 mask mask-squircle ">
                      <img
                        src={
                          player.player.whiteShirtpicture ||
                          profilePicturePlaceholder(player.player.slug)
                        }
                      />
                    </div>
                  </div>
                  <p className="text-lg flex-1 flex items-center gap-2 ">
                    <ShirtIcon size={18} />
                    {player.player.shirtNumber} - {player.name}
                    {whiteMOTM?.player.name === player.name ? (
                      <div className=" ml-5 badge badge-secondary">Craque</div>
                    ) : null}
                  </p>
                  <div className=" w-10 flex items-center justify-between gap-2">
                    <BallIcon className="w-5 h-5 text-white" />
                    <span className="text-lg font-bold">{player.goals}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-2 w-full lg:w-1/2">
              <div className="w-full  p-2 flex items-center gap-4 font-bold ">
                <div className="h-10 w-10 bg-primary rounded-full"></div>
                <span>Preto</span>
              </div>
              {greenPlayers.map((player) => (
                <div
                  key={player.id}
                  className=" transition-all hover:translate-y-0.5 cursor-pointer my-2 hover:bg-base-200 rounded-md p-2 flex items-center gap-5"
                >
                  <div
                    className={`avatar ${champions.map((tournamentPlayers) =>
                      tournamentPlayers.id === player.id
                        ? cn('border-[#ffbf00] border-2 rounded-3xl')
                        : null
                    )}`}
                  >
                    <div className="w-16 mask mask-squircle">
                      <img
                        src={
                          player.player.greenShirtpicture ||
                          profilePicturePlaceholder(player.player.slug)
                        }
                      />
                    </div>
                  </div>
                  <p className="text-lg flex-1 flex items-center gap-2 ">
                    <ShirtIcon size={18} />
                    {player.player.shirtNumber} - {player.name}
                    {greenMOTM?.player.name === player.name ? (
                      <div className="badge badge-primary ml-5">Craque</div>
                    ) : null}
                  </p>
                  <div className=" w-10 flex items-center justify-between gap-2">
                    <BallIcon className="w-5 h-5 text-white" />
                    <span className="text-lg font-bold">{player.goals}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Jogo;
