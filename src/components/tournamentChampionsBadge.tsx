import { Crown } from 'lucide-react';
interface tournamentChampionsBadge {
  type: string;
}
export function TournamentChampionsBadge({ type }: tournamentChampionsBadge) {
  if (type === 'SUMMER')
    return (
      <div className="badge  bg-secondary flex  text-black  p-[13px] w-full text-sm font-bold">
        <Crown className="mr-2" />
        <span>Campeão Torneio de Verão 2024</span>
      </div>
    );
  return (
    <div className="badge bg-primary  text-white p-[13px]  text-sm font-bold">
      <Crown className="mr-2" />
      <span>Campeão Torneio de Inverno 2025</span>
    </div>
  );
}
