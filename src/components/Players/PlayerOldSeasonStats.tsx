import { OldSeason } from '../../..';
import { getPlayerRecord } from '../../functions/functions';

type PlayerOldSeasonStatsProps = {
  season: OldSeason;
  playerPosition: 'OUTFIELDPLAYER' | 'GOALKEEPER';
};

type StatCardProps = {
  label: string;
  value: React.ReactNode;
};

const StatCard = ({ label, value }: StatCardProps) => (
  <div className="player-profile-stats shadow">
    <span className="text-sm">{label}</span>
    <span className="text-xl font-bold">{value}</span>
  </div>
);

export const PlayerOldSeasonStats = ({ season, playerPosition }: PlayerOldSeasonStatsProps) => {
  const { year, goals, goalsConceded, victories, defeats, draws, rankPosition } = season;

  const games = victories + defeats + draws;
  const points = victories * 3 + draws;
  const record = getPlayerRecord(victories, draws, defeats);

  const statConfig =
    playerPosition === 'OUTFIELDPLAYER'
      ? {
          goalsValue: goals,
          goalsLabel: 'Gols',
          goalsPerGameLabel: 'Gols p/j',
        }
      : {
          goalsValue: goalsConceded,
          goalsLabel: 'Gols S',
          goalsPerGameLabel: 'Gols S p/j',
        };

  const goalsPerGame = games > 0 ? (statConfig.goalsValue / games).toFixed(2) : '0.00';

  const stats = [
    { label: statConfig.goalsLabel, value: statConfig.goalsValue },
    { label: 'Vitórias', value: victories },
    { label: 'Derrotas', value: defeats },
    { label: 'Empates', value: draws },
    { label: 'Pontos', value: points },
    { label: statConfig.goalsPerGameLabel, value: goalsPerGame },
    { label: 'Pos', value: `${rankPosition ?? '-'}°` },
    { label: 'Aprov', value: record + '%' },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mb-4 font-bold underline">Temporada {year}</h1>

      <div className="mx-auto flex w-[90%] max-w-100 flex-wrap items-center justify-center gap-2.5 md:max-w-175">
        {stats.map(({ label, value }) => (
          <StatCard key={label} label={label} value={value} />
        ))}
      </div>
    </div>
  );
};
