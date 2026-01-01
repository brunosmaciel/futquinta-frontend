import { useRef, useState } from 'react';
import { getPlayerGameResult } from '../../utils/getPlayerGameResult';
import { formatInTimeZone } from 'date-fns-tz';
import { GetStaticProps } from 'next';
import Head from 'next/head';

import { GeneralRankingAPIType, PlayerProfile } from '../../..';
import { PlayerProfileImage } from '../../components/PlayerProfileImage';
import { api } from '../../services/axios';
import { PlayerProfileGameResult } from '../../components/PlayerProfileGameResult';
import { useRouter } from 'next/navigation';
import { PlayerSeasonStats } from '../../components/Players/PlayerSeasonStats';
import { PlayerOldSeasonStats } from '../../components/Players/PlayerOldSeasonStats';
import { PlayerAllTimeStats } from '../../components/Players/PlayerAllTimeStats';

export type JogadorProps = {
  player: PlayerProfile;
  rankPosition: string;
};
const Jogador = ({ player, rankPosition }: JogadorProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const [tabYear, setTabYear] = useState<number>(new Date().getFullYear());

  const handleTabChange = (e: any) => {
    setTabYear(e.target.tabIndex);
  };

  const games = [...player.Stats].sort((a, b) => {
    const aDate = a.createdAt;
    const bDate = b.createdAt;

    if (new Date(aDate) > new Date(bDate)) return -1;

    return 0;
  });

  const oldSeasons = player.oldSeason.sort((a, b) => (a.year < b.year ? 1 : -1));
  const currentOldSeason = oldSeasons.find((season) => season.year === tabYear);

  return (
    <>
      <Head>
        <title>{`${player.name} #${player.shirtNumber}`}</title>
        <meta property="og:url" content={`/jogadores/${player.slug}`} />
      </Head>
      <div className="flex flex-col pt-20 md:pt-4">
        <div className="flex flex-col items-center gap-5 py-2  w-[90%] mx-auto cursor-pointer">
          {player?.role === 'GUEST' ? (
            <span className="indicator-item badge badge-primary">Convidado</span>
          ) : null}
          <PlayerProfileImage player={player} setIsOpen={setIsOpen} />

          <h1 className="text-xl font-bold">
            {player.name} #{player.shirtNumber || '00'}
          </h1>
        </div>
        {/* {estatisticas} */}
        <div className="flex flex-col items-center px-2">
          <div className="tabs">
            <a
              tabIndex={new Date().getFullYear()}
              className={`tab tab-lifted  ${
                tabYear === new Date().getFullYear() ? 'tab-active' : 'tab'
              } `}
              onClick={handleTabChange}
            >
              {'2026'}
            </a>
            {oldSeasons.map((season, i, key) => (
              <a
                tabIndex={season.year}
                className={`tab tab-lifted ${tabYear === season.year ? 'tab-active' : 'tab'} `}
                onClick={handleTabChange}
              >
                {season.year}
              </a>
            ))}
            <a
              tabIndex={2021}
              className={`tab tab-lifted  ${tabYear === 2021 ? 'tab-active' : 'tab'} `}
              onClick={handleTabChange}
            >
              {'Total'}
            </a>
          </div>

          {tabYear === new Date().getFullYear() ? (
            <PlayerSeasonStats year={2025} player={player} rankPosition={rankPosition} />
          ) : null}

          {currentOldSeason ? (
            <PlayerOldSeasonStats
              season={currentOldSeason}
              playerPosition={player.playerPosition}
            />
          ) : null}
          {tabYear === 2021 && <PlayerAllTimeStats year={2021} player={player} />}
        </div>
        <div className="divider"></div>
        <div className="w-[95%] max-w-[400px] md:max-w-[700px] mx-auto">
          <div className="w-[95%] mx-auto text-lg font-bold mb-4 flex justify-center ">
            <h2>Jogos</h2>
          </div>

          {games.map((stat) => (
            <div
              key={stat.Game.id}
              onClick={() => router.push(`/jogos/${stat.gameId}`)}
              className="h-14  space-y-2 w-[95%] max-w-[400px] md:max-w-[700px] mx-auto flex gap-2 flex-col justify-center my-4 cursor-pointer hover:-translate-y-1 transition-all"
            >
              <div className="flex my-2 w-full p-2 hover:bg-base-200 transition-all rounded-md ">
                <div className="flex flex-col items-center w-24">
                  <p>{formatInTimeZone(stat.Game.gameDate, 'America/Sao_Paulo', 'dd/MM')}</p>
                  <p className="text-sm">Rodada {stat.Game.fixture}</p>
                </div>
                <div className="divider divider-horizontal"></div>
                <div className="flex-1">
                  <div className="flex justify-between w-20">
                    <p className="text-white">Preto </p>
                    <p className="text-white">{stat.Game.greenGoals}</p>
                  </div>
                  <div className="flex justify-between w-20">
                    <p className="text-white">Branco</p>
                    <p className="text-white">{stat.Game.whiteGoals}</p>
                  </div>
                </div>
                <div className=" h-full flex items-center justify-center">
                  <PlayerProfileGameResult
                    result={getPlayerGameResult(stat.currentTeam, stat.Game.winnerTeam)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const data = await Promise.all([
    await api.get<PlayerProfile>(`/players/${context?.params?.slug}`),
    await api.get<GeneralRankingAPIType[]>('/rankings/general-ranking'),
  ]);

  const player = data[0].data;

  const rankPosition = data[1].data.filter((pl) => pl?.name === player?.name)[0]?.position || '-';

  return {
    props: {
      player,
      rankPosition,
    },
    revalidate: 10,
  };
};
export async function getStaticPaths() {
  const { data: players } = await api.get<PlayerProfile[]>('/players');

  return {
    paths: players.map((player) => {
      return {
        params: {
          slug: player.slug,
        },
      };
    }),
    fallback: false,
  };
}
export default Jogador;
