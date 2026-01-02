import { Crown } from 'lucide-react';
interface tournamentChampionsBadge {
  type: string;
}
export function TournamentChampionsBadge({ type }: tournamentChampionsBadge) {
  if (type === 'SUMMER')
    return (
      <div className="badge  bg-secondary flex  text-black  p-3.25 w-full text-sm font-bold">
        <Crown className="mr-2" />
        <span>Campeão Torneio de Verão 2024</span>
      </div>
    );
  return (
    <div className="badge bg-primary  text-black p-3.25  text-sm font-bold">
      <Crown className="mr-2" />
      <span>Campeão Torneio de Inverno 2025</span>
    </div>
  );
}
