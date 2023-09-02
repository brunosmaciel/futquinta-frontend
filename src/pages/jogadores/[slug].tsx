import { useState } from 'react';
import { getPlayerGameResult } from '../../utils/getPlayerGameResult';
import { formatInTimeZone } from 'date-fns-tz';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { GeneralRankingAPIType, PlayerProfile } from '../../..';
import { PlayerProfileImage } from '../../components/PlayerProfileImage';
import { getPlayerStats } from '../../functions/getPlayerStats';
import { api } from '../../services/axios';
import { profilePicturePlaceholder } from '../../utils/profilePicturePlaceholder';
import { PlayerProfileGameResult } from '../../components/PlayerProfileGameResult';
import { useRouter } from 'next/navigation';

export type JogadorProps = {
  player: PlayerProfile;
  rankPosition: string;
};
const Jogador = ({ player, rankPosition }: JogadorProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const [currentPlayerProfilePicture, setCurrentPlayerProfilePicture] = useState(
    player.currentPicture || ''
  );

  const games = [...player.Stats].sort((a, b) => {
    const aDate = a.createdAt;
    const bDate = b.createdAt;

    if (new Date(aDate) > new Date(bDate)) return -1;

    return 0;
  });
  const {
    goals,
    goalsConceded,
    victories,
    defeats,
    draws,
    points,
    goalsPerGame,
    mvp,

    goalsConcededPerGame,
  } = getPlayerStats(player);

  return (
    <>
      <Head>
        <title>{`${player.name} #${player.shirtNumber}`}</title>
        <meta property="og:url" content={`/jogadores/${player.slug}`} />
      </Head>
      <div className="flex flex-col">
        <div className="flex flex-col items-center gap-5 py-2  w-[90%] mx-auto cursor-pointer">
          {player?.role === 'GUEST' ? (
            <span className="indicator-item badge badge-primary">Convidado</span>
          ) : null}
          <PlayerProfileImage player={player} setIsOpen={setIsOpen} />

          <h1 className="text-xl font-bold">
            {player.name} #{player.shirtNumber || '00'}
          </h1>
          {/* The button to open modal */}
          <label htmlFor={`my-modal-${player.id}`}></label>

          {/* Put this part before </body> tag */}
          <input
            type="checkbox"
            id={`my-modal-${player.id}`}
            className="modal-toggle"
            onChange={() => ''}
            checked={isOpen}
          />
          <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Galeria</h3>
              <div className="flex my-4 gap-8 justify-center  w-full">
                {player.whiteShirtpicture && (
                  <div className="flex flex-col gap-2 items-center">
                    <Image
                      src={player.whiteShirtpicture || ''}
                      alt="Foto de perfil do jogador"
                      width={300}
                      height={300}
                      className="rounded-xl w-32 h-32 border-2"
                      onClick={() => setIsOpen(true)}
                    />
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => setCurrentPlayerProfilePicture('WHITE')}
                    >
                      Usar foto
                    </button>
                  </div>
                )}
                {player.greenShirtpicture && (
                  <div className="flex flex-col gap-2 items-center">
                    <Image
                      src={player.greenShirtpicture || ''}
                      alt="Foto de perfil do jogador"
                      width={300}
                      height={300}
                      className="rounded-xl w-32 h-32 border-2"
                      onClick={() => setIsOpen(true)}
                    />
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => setCurrentPlayerProfilePicture('WHITE')}
                    >
                      Usar foto
                    </button>
                  </div>
                )}
              </div>
              <div className="modal-action">
                <label
                  htmlFor={`my-modal-${player.id}`}
                  className="btn"
                  onClick={() => setIsOpen(false)}
                >
                  Salvar
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-[90%] max-w-[400px] md:max-w-[700px] mx-auto flex flex-wrap justify-center items-center gap-[10px]">
          <div className="player-profile-stats">
            {player.function === 'OUTFIELDPLAYER' ? (
              <>
                <span className="text-sm">Gols</span>
                <span className="text-xl font-bold">{goals}</span>
              </>
            ) : (
              <>
                <span className="text-sm">Gols S</span>
                <span className="text-xl font-bold">{goalsConceded}</span>
              </>
            )}
          </div>
          <div className="player-profile-stats">
            <span className="text-sm">Vitorias</span>
            <span className="text-xl font-bold">{victories}</span>
          </div>
          <div className="player-profile-stats">
            <span className="text-sm">Derrotas</span>
            <span className="text-xl font-bold">{defeats}</span>
          </div>
          <div className="player-profile-stats">
            <span className="text-sm">Empates</span>
            <span className="text-xl font-bold">{draws}</span>
          </div>
          <div className="player-profile-stats">
            <span className="text-sm">Pontos</span>
            <span className="text-xl font-bold">{points}</span>
          </div>
          <div className="player-profile-stats">
            {player.function === 'OUTFIELDPLAYER' ? (
              <>
                <span className="text-sm">Gols p/j</span>
                <span className="text-xl font-bold">{goalsPerGame.toFixed(2)}</span>
              </>
            ) : (
              <>
                <span className="text-sm">Gols S p/j</span>
                <span className="text-xl font-bold">{goalsConcededPerGame}</span>
              </>
            )}
          </div>
          <div className="player-profile-stats">
            <span className="text-sm">Pos</span>
            <span className="text-xl font-bold">{rankPosition || '-'}</span>
          </div>
          <div className="player-profile-stats">
            <span className="text-sm">MVP</span>
            <span className="text-xl font-bold">{mvp}</span>
          </div>
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
                    <p className="text-white">Verde </p>
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
