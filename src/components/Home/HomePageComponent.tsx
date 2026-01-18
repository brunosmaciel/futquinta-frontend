import { GameType, GeneralRankingAPIType, RecordRankingType } from '../../..';

import { CalendarIcon } from 'lucide-react';
import { formatInTimeZone } from 'date-fns-tz';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { ShieldIcon } from '../ShieldIcon';
import { GeneralRanking } from './GeneralRanking';
import { RecordRanking } from './RecordRanking';
import VerdeEscuroShield from '../VerdeEscuroShield';
import VerdeListradoShield from '../VerdeListradoShield';

type HomeProps = {
  recordRanking: RecordRankingType[];
  games: GameType[];
  generalRankPlayers: GeneralRankingAPIType[];
};

const HomeComponent = ({ games, generalRankPlayers, recordRanking }: HomeProps) => {
  const router = useRouter();

  if (!games.length) {
    return (
      <div className="flex h-full w-full items-center justify-center flex-col ">
        <h1 className="text-5xl font-bold mb-5">Temporada 2026</h1>
        <h3 className="italic">Nenhum jogo encontrado...branch</h3>
      </div>
    );
  }

  const latestGame = games[0];

  const handleOpenGame = useCallback(() => {
    router.push(`/jogos/${latestGame.id}`);
  }, [router, latestGame.id]);

  return (
    <div className="container flex h-full flex-col items-center">
      {/* Capa do jogo */}
      <div
        onClick={handleOpenGame}
        className="relative m-3 flex h-40 w-[95%] max-w-lg cursor-pointer items-center justify-center overflow-hidden rounded-2xl shadow-xl md:h-60"
      >
        <div
          className="absolute h-60 w-full max-w-lg rounded-2xl bg-cover bg-center transition-all duration-500 ease-in-out hover:scale-[1.1]"
          style={{ backgroundImage: `url(${latestGame.gamePicture ?? ''})` }}
        />
      </div>

      {/* Data */}
      <div className="mt-4">
        <span className="flex items-center gap-2">
          <CalendarIcon />
          <span>{formatInTimeZone(latestGame.gameDate, 'America/Sao_Paulo', 'dd/MM/yyyy')}</span>
        </span>
      </div>

      {/* Placar */}
      <div className="mt-2 flex items-center gap-4 text-lg text-primary">
        <div className="flex flex-row items-center gap-2 text-secondary">
          <VerdeEscuroShield className="w-20 h-20" />
          <p className="text-5xl font-bold text-black">{latestGame.whiteGoals}</p>
        </div>

        <span className="text-black">x</span>

        <div className="flex flex-row-reverse items-center gap-2 text-secondary">
          <VerdeListradoShield className="w-20 h-20" />
          <p className="text-5xl font-bold text-black">{latestGame.greenGoals}</p>
        </div>
      </div>

      {/* Link */}
      <Link href={`/jogos/${latestGame.id}`} className="link mt-4">
        Ver jogo completo
      </Link>

      <div className="divider" />

      {/* Rankings */}
      <div className="flex w-full flex-col justify-center">
        <h1 className="w-fit self-center border-b-2 pb-1 text-xl font-bold">Resumo da temporada</h1>

        <div className="mt-6 flex w-full flex-col gap-4 lg:flex-row">
          <section className="w-full lg:w-1/2">
            <h3 className="text-center font-bold ">Melhores pontuadores</h3>
            <GeneralRanking players={generalRankPlayers} />
          </section>

          <section className="w-full lg:w-1/2">
            <h3 className="text-center font-bold">Melhores aproveitamentos</h3>
            <RecordRanking players={recordRanking} />
          </section>
        </div>
      </div>
    </div>
  );
};

export { HomeComponent };
