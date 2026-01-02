import { useState, MouseEvent, SetStateAction } from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { formatInTimeZone } from 'date-fns-tz';

import { GeneralRankingAPIType, PlayerProfile } from '../../..';
import { api } from '../../services/axios';

import { getPlayerGameResult } from '../../utils/getPlayerGameResult';
import { PlayerProfileImage } from '../../components/PlayerProfileImage';
import { PlayerProfileGameResult } from '../../components/PlayerProfileGameResult';
import { PlayerSeasonStats } from '../../components/Players/PlayerSeasonStats';
import { PlayerOldSeasonStats } from '../../components/Players/PlayerOldSeasonStats';
import { PlayerAllTimeStats } from '../../components/Players/PlayerAllTimeStats';

export type JogadorProps = {
  player: PlayerProfile;
  rankPosition: string;
};

const CURRENT_YEAR = new Date().getFullYear();
const TOTAL_TAB_YEAR = 2021;

const Jogador = ({ player, rankPosition }: JogadorProps) => {
  const router = useRouter();
  const [tabYear, setTabYear] = useState<number>(CURRENT_YEAR);

  const handleTabChange = (e: MouseEvent<HTMLAnchorElement>) => {
    setTabYear(Number(e.currentTarget.tabIndex));
  };

  const games = [...player.Stats].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const oldSeasons = [...player.oldSeason].sort((a, b) => b.year - a.year);
  const currentOldSeason = oldSeasons.find((season) => season.year === tabYear);

  return (
    <>
      <Head>
        <title>{`${player.name} #${player.shirtNumber || '00'}`}</title>
        <meta property="og:url" content={`/jogadores/${player.slug}`} />
      </Head>

      <div className="flex flex-col pt-20 md:pt-4">
        {/* Header */}
        <div className="flex flex-col items-center gap-5 py-2 w-[90%] mx-auto">
          {player.role === 'GUEST' && <span className="badge badge-primary">Convidado</span>}

          <PlayerProfileImage player={player} />

          <h1 className="text-xl font-bold">
            {player.name} #{player.shirtNumber || '00'}
          </h1>
        </div>

        {/* Estatísticas */}
        <div className="flex flex-col items-center ">
          <div className="tabs tabs-border p-4">
            <a
              tabIndex={CURRENT_YEAR}
              className={`tab tab-lifted ${tabYear === CURRENT_YEAR ? 'tab-active' : ''}`}
              onClick={handleTabChange}
            >
              {CURRENT_YEAR}
            </a>

            {oldSeasons.map((season) => (
              <a
                key={season.year}
                tabIndex={season.year}
                className={`tab tab-lifted ${tabYear === season.year ? 'tab-active' : ''}`}
                onClick={handleTabChange}
              >
                {season.year}
              </a>
            ))}

            <a
              tabIndex={TOTAL_TAB_YEAR}
              className={`tab tab-lifted ${tabYear === TOTAL_TAB_YEAR ? 'tab-active' : ''}`}
              onClick={handleTabChange}
            >
              Total
            </a>
          </div>

          {tabYear === CURRENT_YEAR && (
            <PlayerSeasonStats year={CURRENT_YEAR} player={player} rankPosition={rankPosition} />
          )}

          {currentOldSeason && (
            <PlayerOldSeasonStats
              season={currentOldSeason}
              playerPosition={player.playerPosition}
            />
          )}

          {tabYear === TOTAL_TAB_YEAR && <PlayerAllTimeStats player={player} />}
        </div>

        <div className="divider" />

        {/* Jogos */}
        <div className="w-[95%] max-w-175 mx-auto">
          <h2 className="text-lg font-bold mb-4 text-center">Jogos</h2>

          {games.map((stat) => (
            <div
              key={stat.Game.id}
              onClick={() => router.push(`/jogos/${stat.gameId}`)}
              className="my-4 cursor-pointer hover:-translate-y-1 transition-all"
            >
              <div className="flex w-full p-2 hover:bg-base-200 rounded-md">
                <div className="flex flex-col items-center w-24">
                  <p>{formatInTimeZone(stat.Game.gameDate, 'America/Sao_Paulo', 'dd/MM')}</p>
                  <p className="text-sm">Rodada {stat.Game.fixture}</p>
                </div>

                <div className="divider divider-horizontal" />

                <div className="flex-1">
                  <div className="flex justify-between w-20">
                    <span>Preto</span>
                    <span>{stat.Game.greenGoals}</span>
                  </div>
                  <div className="flex justify-between w-20">
                    <span>Branco</span>
                    <span>{stat.Game.whiteGoals}</span>
                  </div>
                </div>

                <div className="flex items-center">
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const [playerRes, rankingRes] = await Promise.all([
    api.get<PlayerProfile>(`/players/${params?.slug}`),
    api.get<GeneralRankingAPIType[]>('/rankings/general-ranking'),
  ]);

  const player = playerRes.data;
  const rankPosition = rankingRes.data.find((pl) => pl.name === player.name)?.position ?? '-';

  return {
    props: {
      player,
      rankPosition,
    },
    revalidate: 10,
  };
};

export const getStaticPaths = async () => {
  const { data: players } = await api.get<PlayerProfile[]>('/players');

  return {
    paths: players.map((player) => ({
      params: { slug: player.slug },
    })),
    fallback: false,
  };
};

export default Jogador;
