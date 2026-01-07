/* eslint-disable @next/next/no-img-element */
import { useMemo } from 'react';
import { champions } from '../../../public/campeoes';
import { useRouter } from 'next/router';
import { formatInTimeZone } from 'date-fns-tz';
import { CalendarIcon, ShirtIcon } from 'lucide-react';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

import { GameType, PlayerProfile, PlayerStats } from '../../..';
import { Score } from '../../components/Game/Score';
import { LoadingSpin } from '../../components/Loading';
import BallIcon from '../../components/ui/BallIcon';
import { profilePicturePlaceholder } from '../../utils/profilePicturePlaceholder';
import FourOhFour from '../404';
import { cn } from '../../utils/cn';

type Team = 'WHITE' | 'GREEN';

const sortByFunction = (a: any, b: any) =>
  a.function < b.function ? -1 : a.function > b.function ? 1 : 0;

const Jogo = () => {
  const { push, query } = useRouter();
  const { id } = query;
  const router = useRouter();
  const { data, isLoading, error } = useSWR<GameType>(`/games/${id}`);

  if (!data) return null;
  const whitePlayers =
    data?.players.filter((p) => p.currentTeam === 'WHITE').sort(sortByFunction) ?? [];

  const greenPlayers =
    data?.players.filter((p) => p.currentTeam === 'GREEN').sort(sortByFunction) ?? [];
  if (!id) return <FourOhFour />;

  if (error) return <FourOhFour />;
  if (isLoading) return <LoadingSpin />;

  const whiteMOTM = data.MOTM.find((p) => p.team === 'WHITE');
  const greenMOTM = data.MOTM.find((p) => p.team === 'GREEN');

  const renderPlayer = (player: any, team: Team, motmName?: string) => {

    const shirtPicture =
      team === 'WHITE' ? player.player.whiteShirtpicture : player.player.greenShirtpicture;

    return (
      <div
        key={player.id}
        onClick={() => router.push(`/jogadores/${player.player.slug}`)}
        className="my-2 flex cursor-pointer items-center gap-4 rounded-md p-2 transition-all hover:translate-y-1 hover:shadow-2xl"
      >
        <div className={cn('avatar')}>
          <div className="mask mask-squircle w-16">
            <img
              src={shirtPicture || profilePicturePlaceholder(player.player.slug)}
              alt={player.name}
            />
          </div>
        </div>

        <p className="flex flex-1 items-center gap-2 text-lg">
          <ShirtIcon size={18} />
          {player.player.shirtNumber} - {player.name}
          {motmName === player.name && <span className="badge badge-ghost ml-4">Craque</span>}
          {data.BolaMurcha[0].player.name === player.name && (
            <span className="badge badge-ghost ml-4">Bagre</span>
          )}
        </p>

        <div className="flex  items-center gap-2">
          {Array.from({ length: player.goals }).map((_, index) => (
            <BallIcon key={index} className="h-5 w-5 text-primary" />
          ))}
        </div>
      </div>
    );
  };
  const currentBolaMurcha = data.players.find((player) => player.name === data.BolaMurcha[0].player.name)




  const GetMOTMProfilePicture = ({ player }: any) => {
    if (!player) return null
    const imageUrl = player.currentTeam === player.player.whiteShirtpicture ? player.player.whiteShirtpicture : player.player.greenShirtpicture


    return <div className='flex max-w-50 rounded shadow-xl  p-4 flex-col items-center'>
      <Image
        priority
        src={imageUrl}
        alt="Bagre do Jogo"
        width={768}
        height={768}
        className="w-32 rounded-md drop-shadow-lg"
      />
      <span className='font-bold text-xl'>Bagre do jogo</span>
    </div>

  }
  return (
    <div className="flex  flex-col  items-center p-4">
      {data.gamePicture && (
        <div className="mx-auto w-full max-w-130 shadow-xl rounded-lg p-4">
          <Image
            priority
            src={data.gamePicture}
            alt="Foto da partida"
            width={768}
            height={768}
            className="h-full w-full rounded-md "
          />
        </div>
      )}

      <div className="mt-4 flex w-full justify-center gap-2 text-2xl font-bold">
        Rodada <span className="border-b-2 border-primary">{data.fixture}</span>
      </div>

      <div className="mt-4 flex w-full items-center justify-center gap-2">
        <CalendarIcon size={20} />
        <span>{formatInTimeZone(data.gameDate, 'America/Sao_Paulo', 'dd/MM/yyyy')}</span>
      </div>

      <Score greenGoals={data.greenGoals} whiteGoals={data.whiteGoals} />
      <div className="flex md:lg:flex-row md:lg:space-x-7 justify-center space-x-2.5 w-[90%] 
      ">
        <GetMOTMProfilePicture player={currentBolaMurcha} />
        {data.MOTM[0] && <div className='flex rounded max-w-50 shadow-xl p-4 flex-col items-center'>

          <Image
            priority
            src={data.MOTM[0].team === "WHITE" ? data.MOTM[0].player.whiteShirtpicture || '' : data.MOTM[0].player.greenShirtpicture || ''}
            alt="Bagre do Jogo"
            width={768}
            height={768}
            className="w-32 rounded-md drop-shadow-lg"
          />
          <span className='font-bold text-xl'>Craque do jogo</span>
        </div>}
      </div>
      <div className="mt-4 flex w-full flex-col lg:flex-row">
        {/* Time Branco */}
        <section className="w-full p-2 lg:w-1/2">
          <header className="flex items-center gap-4 p-2 font-bold">
            <div className="h-10 w-10 rounded-full bg-secondary" />
            <span className="text-xl">Verde Claro</span>
          </header>

          {whitePlayers.map((player) => renderPlayer(player, 'WHITE', whiteMOTM?.player.name))}
        </section>

        {/* Time Verde */}
        <section className="w-full p-2 lg:w-1/2">
          <header className="flex items-center gap-4 p-2 font-bold">
            <div className="h-10 w-10 rounded-full bg-primary" />
            <span className="text-xl">Verde Escuro</span>
          </header>

          {greenPlayers.map((player) => renderPlayer(player, 'GREEN', greenMOTM?.player.name))}
        </section>
      </div>
    </div>
  );
};

export default Jogo;
