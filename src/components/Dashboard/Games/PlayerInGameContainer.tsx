

import {
  Minus,
  MinusIcon,
  MoreHorizontal,
  Plus,
  PlusIcon,
  ShirtIcon,
  Trash,
  Trash2Icon,
} from 'lucide-react';
import { mutate } from 'swr';

import { PlayerStats } from '../../../..';
import { useButtonLoading } from '../../../hooks/useButtonLoading';
import { api } from '../../../services/axios';
import { cn } from '../../../utils/cn';
import { Button } from '../../Button';
type PlayerInGameContainerProps = {
  playerStats: PlayerStats;
};
export const PlayerInGameContainer = ({ playerStats: player }: PlayerInGameContainerProps) => {
  const { setButtonLoading, isButtonLoading } = useButtonLoading();
  const handleRemovePlayer = async () => {
    try {
      await api.delete(`/stats/${player.id}`);
      mutate(`/games/${player.gameId}`);
     alert(`Jogador ${player.name} removido com sucesso`);
    } catch (err: any) {
      alert('Algum erro qualquer');
    }
  };
  const handleIncrementGoals = async () => {
    setButtonLoading(true);
    try {
      await Promise.all([
        await api(`/stats/goals/increment/${player.id}`),
        await api.put(`/games/goals/increment/${player.gameId}`, {
          team: player.currentTeam,
        }),
      ]);

      await mutate(`/games/${player.gameId}`);
      setButtonLoading(false);
    } catch (err: any) {
      alert('Internal Server Error');
      setButtonLoading(false);
    }
  };
  const handleDecrementGoals = async () => {
    if (player.goals === 0) return;
    setButtonLoading(true);
    try {
      await Promise.all([
        await api(`/stats/goals/decrement/${player.id}`),
        await api.put(`/games/goals/decrement/${player.gameId}`, {
          team: player.currentTeam,
        }),
      ]);

      await mutate(`/games/${player.gameId}`);
      setButtonLoading(false);
    } catch (err: any) {
      alert('Internal Server Error');
      setButtonLoading(false);
    }
  };
  const currentTeamColorClassname =
    player.currentTeam === 'GREEN' ? 'border-b-primary' : 'border-b-secondary';
  return (
    <>
      <div className={cn('mt-2 border-b-2  p-4 flex h-fit  gap-2 ', currentTeamColorClassname)}>
        <div className=" flex items-center gap-2 h-10">
          <span className="flex items-center gap-2">
            <ShirtIcon
              className={cn(player.currentTeam === 'WHITE' ? 'text-white' : 'text-primary')}
            />
            {player.player.shirtNumber}
          </span>
          <p className="font-bold">{player.name}</p>
        </div>

        <div className=" flex-1 flex items-center">
          <div className="flex-1 flex gap-2 items-center justify-center">
            <button onClick={handleIncrementGoals}>
              <Plus />
            </button>
            <div className="flex flex-col justify-between items-center">
              <span className="text-lg font-bold">{player.goals}</span>
            </div>
            <button onClick={handleDecrementGoals}>
              <Minus />
            </button>
          </div>
          <div>
            <button onClick={handleRemovePlayer} className="hover:scale-[1.1] transition-all">
              <Trash />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
