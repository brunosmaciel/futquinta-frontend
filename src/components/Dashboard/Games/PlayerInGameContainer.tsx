import { toast } from 'react-toastify';

import { MinusIcon, MoreHorizontal, PlusIcon, Trash2Icon } from 'lucide-react';
import { mutate } from 'swr';

import { PlayerStats } from '../../../..';
import { useButtonLoading } from '../../../hooks/useButtonLoading';
import { api } from '../../../services/axios';
import { cn } from '../../../utils/cn';
import { Button } from '../../Button';
type PlayerInGameContainerProps = {
  playerStats: PlayerStats;
};
export const PlayerInGameContainer = ({ playerStats }: PlayerInGameContainerProps) => {
  const { setButtonLoading, isButtonLoading } = useButtonLoading();
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
    setButtonLoading(true);
    try {
      await Promise.all([
        await api(`/stats/goals/increment/${playerStats.id}`),
        await api.put(`/games/goals/increment/${playerStats.gameId}`, {
          team: playerStats.currentTeam,
        }),
      ]);

      await mutate(`/games/${playerStats.gameId}`);
      setButtonLoading(false);
    } catch (err: any) {
      toast.error('Internal Server Error');
      setButtonLoading(false);
    }
  };
  const handleDecrementGoals = async () => {
    if (playerStats.goals === 0) return;
    setButtonLoading(true);
    try {
      await Promise.all([
        await api(`/stats/goals/decrement/${playerStats.id}`),
        await api.put(`/games/goals/decrement/${playerStats.gameId}`, {
          team: playerStats.currentTeam,
        }),
      ]);

      await mutate(`/games/${playerStats.gameId}`);
      setButtonLoading(false);
    } catch (err: any) {
      toast.error('Internal Server Error');
      setButtonLoading(false);
    }
  };
  const currentTeamColorClassname =
    playerStats.currentTeam === 'GREEN' ? 'border-b-primary' : 'border-b-secondary';
  return (
    <>
      <div className={cn('mt-2 border-b-2  p-4 flex h-fit', currentTeamColorClassname)}>
        <div className="flex flex-col justify-between flex-1">
          <span className="cursor-pointer w-fit tooltip">
            <div className="dropdown">
              <label tabIndex={0} className="cursor-pointer">
                <MoreHorizontal />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-300 rounded-box w-52"
              >
                <li className="">
                  <a onClick={handleRemovePlayer}>
                    <Trash2Icon size={14} className="cursor-pointer tooltip" />
                    <span className="text-[14px]">Apagar</span>
                  </a>
                </li>
              </ul>
            </div>
          </span>
          <h1 className="font-bold w-fit ">{playerStats.name}</h1>
        </div>
        <div className="flex items-center justify-end gap-2 w-fit">
          <div>
            {isButtonLoading ? (
              <div className="max-w-[96px]">
                <Button
                  isLoading={isButtonLoading}
                  className={`btn btn-ghost btn-circle `}
                  onClick={handleIncrementGoals}
                ></Button>
              </div>
            ) : (
              <>
                <Button
                  isLoading={isButtonLoading}
                  className={`btn btn-ghost btn-circle `}
                  onClick={handleIncrementGoals}
                >
                  <PlusIcon />
                </Button>
                <Button
                  isLoading={isButtonLoading}
                  className={`btn btn-ghost btn-circle `}
                  onClick={handleDecrementGoals}
                >
                  <MinusIcon />
                </Button>
              </>
            )}
          </div>
          <div className="stats shadow bg-base-200/50">
            <div className="stat">
              <div className="stat-title text-sm">Gols</div>
              <div className="stat-value text-center text-lg">{playerStats.goals}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
