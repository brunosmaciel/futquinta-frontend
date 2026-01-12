import { PlayerProfile } from '../../..';
import { getPlayerRecord } from '../../functions/functions';

export type PlayerAllTimeStatsProps = {
  player: PlayerProfile;
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

export const PlayerAllTimeStats = ({ player }: PlayerAllTimeStatsProps) => {
  const { goals, goalsConceded, victories, defeats, draws, playerPosition } = player;
  const safeGoalsConceded = goalsConceded ?? 0;

  const games = victories + defeats + draws;
  const points = victories * 3 + draws;
  const record = getPlayerRecord(victories, draws, defeats);

  const isOutfieldPlayer = playerPosition === 'OUTFIELDPLAYER';

  const goalStats = isOutfieldPlayer
    ? {
        total: goals,
        label: 'Gols',
        perGameLabel: 'Gols p/j',
        perGame: games > 0 ? (goals / games).toFixed(2) : '0.00',
      }
    : {
        total: goalsConceded,
        label: 'Gols S',
        perGameLabel: 'Gols S p/j',
        perGame: games > 0 ? (safeGoalsConceded / games).toFixed(2) : '0.00',
      };

  const stats = [
    { label: goalStats.label, value: goalStats.total },
    { label: 'Vitórias', value: victories },
    { label: 'Derrotas', value: defeats },
    { label: 'Empates', value: draws },
    { label: 'Pontos', value: points },
    { label: goalStats.perGameLabel, value: goalStats.perGame },
    { label: 'Jogos', value: games },
    { label: 'Aprov', value: record + '%' },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mb-4 font-bold underline">Historico</h1>

      <div className="mx-auto flex w-[90%] max-w-100 md:max-w-175 flex-wrap items-center justify-center gap-2.5">
        {stats.map(({ label, value }) => (
          <StatCard key={label} label={label} value={value} />
        ))}
      </div>
    </div>
  );
};
