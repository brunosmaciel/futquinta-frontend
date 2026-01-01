import { PlayerProfile } from '../../..';
import { getPlayerRecord } from '../../functions/functions';
import { getPlayerStats } from '../../functions/getPlayerStats';

export type PlayerSeasonStatsProps = {
  year: number;
  player: PlayerProfile;
  rankPosition: string;
};

export const PlayerSeasonStats = ({ player, year, rankPosition }: PlayerSeasonStatsProps) => {
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
  const record = getPlayerRecord(victories, draws, defeats);

  return (
    <div className="flex items-center justify-center flex-col ">
      <h1 className="font-bold mb-4 underline">Temporada {year}</h1>
      <div className=" w-[90%] max-w-[400px] md:max-w-[700px] mx-auto flex flex-wrap justify-center items-center gap-[10px]">
        <div className="player-profile-stats">
          {player.playerPosition === 'OUTFIELDPLAYER' ? (
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
          {player.playerPosition === 'OUTFIELDPLAYER' ? (
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
          <span className="text-sm">Aprov</span>
          <span className="text-xl font-bold">{record}</span>
        </div>
      </div>
    </div>
  );
};
