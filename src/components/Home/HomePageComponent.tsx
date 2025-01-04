import { Game, GeneralRankingAPIType, RecordRankingType } from '../../..';

import { CalendarIcon } from 'lucide-react';
import { formatInTimeZone } from 'date-fns-tz';
import { ShieldIcon } from '../ShieldIcon';
import { useRouter } from 'next/router';
import { GeneralRanking } from './GeneralRanking';
import { RecordRanking } from './RecordRanking';
import Link from 'next/link';
type HomeProps = {
  recordRanking: RecordRankingType[];
  games: Game[];
  generalRankPlayers: GeneralRankingAPIType[];
};
const HomeComponent = ({ games, generalRankPlayers, recordRanking }: HomeProps) => {
  const { push } = useRouter();
  if (games.length === 0)
    return (
      <div className=" h-full w-full flex items-center justify-center">
        {' '}
        <h1 className="text-5xl font-bold">Em manutenção</h1>
      </div>
    );
  return (
    <div className="container  h-full flex flex-col items-center">
      <div
        onClick={() => push(`/jogos/${games[0].id}`)}
        className="relative flex items-center justify-center m-3 overflow-hidden shadow-xl  max-w-lg w-[95%] h-40 md:h-60 rounded-2xl"
      >
        <div
          style={{
            backgroundImage: `url(${games[0].gamePicture || ''})`,
          }}
          className="w-full max-w-lg my-2 cursor-pointer h-60 hover:scale-[1.1] absolute  bg-center bg-cover rounded-2xl transition-all duration-500 ease-in-out"
        ></div>
      </div>
      <div className="mt-4">
        <span className="flex items-center gap-2">
          <CalendarIcon />
          <span>{formatInTimeZone(games[0].gameDate, 'America/Sao_Paulo', 'dd/MM/yyyy')}</span>
        </span>
      </div>
      <div className="flex gap-4 text-lg mt-2 items-center text-secondary">
        <div className="space-x-2 flex items-center">
          <ShieldIcon className="w-16 h-16" />
          <p className="text-3xl">{games[0].whiteGoals}</p>
        </div>
        <div>
          <span>x</span>
        </div>
        <div className="gap-2 flex items-center text-primary flex-row-reverse">
          <ShieldIcon className="w-16 h-16" />
          <p className="text-white text-3xl font-bold">{games[0].greenGoals}</p>
        </div>
      </div>
      <Link href={`/jogos/${games[0].id}`} className="link mt-4">
        Ver jogo completo
      </Link>

      <div className="divider"></div>

      <div className="flex flex-col w-full justify-center ">
        <h1 className="font-bold text-xl border-b-2 pb-1 w-fit self-center">Resumo da temporada</h1>
        <div className="flex flex-col   lg:flex-row w-full  gap-4 mt-6">
          <div className="w-full lg:w-1/2  ">
            <h3 className="text-center">Melhores pontuadores</h3>
            <GeneralRanking players={generalRankPlayers} />
          </div>
          <div className="w-full lg:w-1/2 ">
            <h3 className="text-center">Melhores aproveitamentos</h3>
            <RecordRanking players={recordRanking} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { HomeComponent };
