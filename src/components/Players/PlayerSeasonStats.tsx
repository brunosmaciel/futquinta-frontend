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
    goalsConcededPerGame,
  } = getPlayerStats(player);

  const record = getPlayerRecord(victories, draws, defeats);

  const isOutfieldPlayer = player.playerPosition === 'OUTFIELDPLAYER';

  const stats = [
    {
      label: isOutfieldPlayer ? 'Gols' : 'Gols S',
      value: isOutfieldPlayer ? goals : goalsConceded,
    },
    { label: 'Vitórias', value: victories },
    { label: 'Derrotas', value: defeats },
    { label: 'Empates', value: draws },
    { label: 'Pontos', value: points },
    {
      label: isOutfieldPlayer ? 'Gols p/j' : 'Gols S p/j',
      value: isOutfieldPlayer ? goalsPerGame.toFixed(2) : goalsConcededPerGame,
    },
    {
      label: 'Pos',
      value: rankPosition + '°' || '0°',
      className: 'player-profile-stats shadow',
    },
    {
      label: 'Aprov',
      value: record + '%',
      className: 'player-profile-stats shadow',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mb-4 font-bold underline">Temporada {year}</h1>

      <div className="mx-auto flex w-[90%] max-w-100 flex-wrap items-center justify-center gap-[10px] md:max-w-175">
        {stats.map(({ label, value, className }) => (
          <div key={label} className={className ?? 'player-profile-stats shadow'}>
            <span className="text-sm">{label}</span>
            <span className="text-xl font-bold">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
