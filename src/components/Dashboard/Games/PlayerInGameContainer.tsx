import { toast } from 'react-toastify';

import { MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { mutate } from 'swr';

import { PlayerStats } from '../../../..';
import { api } from '../../../services/axios';
type PlayerInGameContainerProps = {
  playerStats: PlayerStats;
};
export const PlayerInGameContainer = ({ playerStats }: PlayerInGameContainerProps) => {
  const handleRemovePlayer = async () => {
    try {
      await api.delete(`/stats/${playerStats.id}`);
      mutate(`/games/${playerStats.gameId}`);
      toast.success(`Jogador ${playerStats.name} removido com sucesso`, { autoClose: 1000 });
    } catch (err: any) {
      toast.error('Algum erro qualquer');
    }
  };
  const handleIncrementGoals = async () => {
    try {
      await Promise.all([
        await api(`/stats/goals/increment/${playerStats.id}`),
        await api.put(`/games/goals/increment/${playerStats.gameId}`, {
          team: playerStats.currentTeam,
        }),
      ]);

      mutate(`/games/${playerStats.gameId}`);
    } catch (err: any) {
      toast.error('Internal Server Error');
    }
  };
  const handleDecrementGoals = async () => {
    try {
      await Promise.all([
        await api(`/stats/goals/decrement/${playerStats.id}`),
        await api.put(`/games/goals/decrement/${playerStats.gameId}`, {
          team: playerStats.currentTeam,
        }),
      ]);

      mutate(`/games/${playerStats.gameId}`);
    } catch (err: any) {
      toast.error('Internal Server Error');
    }
  };
  return (
    <>
      <div key={playerStats.id} className="mt-2 border-b-[2px] border-base-300 p-[4px] flex h-fit">
        <div className="flex flex-col justify-between flex-1 ">
          <h1 className="font-bold w-fit ">{playerStats.name}</h1>
          <span className="cursor-pointer w-fit tooltip" data-tip="Apagar">
            <Trash2Icon onClick={handleRemovePlayer} className="cursor-pointer tooltip" />
          </span>
        </div>
        <div className="flex items-center justify-end gap-2 w-fit">
          <button className="btn btn-circle" onClick={handleIncrementGoals}>
            <PlusIcon />
          </button>
          <div className="stats shadow bg-base-300">
            <div className="stat">
              <div className="stat-title text-sm">Gols</div>
              <div className="stat-value text-center text-lg">{playerStats.goals}</div>
            </div>
          </div>
          <button className="btn btn-circle" onClick={handleDecrementGoals}>
            <MinusIcon />
          </button>
        </div>
      </div>
    </>
  );
};
