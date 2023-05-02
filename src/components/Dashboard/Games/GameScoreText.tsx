import { toast } from 'react-toastify';

import { PlusIcon, MinusIcon } from 'lucide-react';
import { mutate } from 'swr';

import { Game } from '../../../..';
import { useButtonLoading } from '../../../hooks/useButtonLoading';
import { api } from '../../../services/axios';
type GameScoreTextProps = {
  team: 'GREEN' | 'WHITE';
  game: Game;

  colorClass: string;
  children: React.ReactNode;
};
export const GameScoreText = ({
  children,

  game,
  team,
  colorClass,
}: GameScoreTextProps) => {
  const { loadingClass, setButtonLoading } = useButtonLoading();
  const handleIncrementGoals = async (team: 'WHITE' | 'GREEN') => {
    setButtonLoading(true);
    try {
      await api.put(`/games/goals/increment/${game.id}`, { team });
      await mutate(`/games/${game?.id}`);
      setButtonLoading(false);
    } catch (err: any) {
      toast.error('Internal Server Error');
      setButtonLoading(false);
    }
  };
  const handleDecrementGoals = async (team: 'WHITE' | 'GREEN') => {
    setButtonLoading(true);
    try {
      await api.put(`/games/goals/decrement/${game.id}`, { team });
      await mutate(`/games/${game?.id}`);
      setButtonLoading(false);
    } catch (err: any) {
      toast.error('Internal Server Error');
      setButtonLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-[1px] items-center">
      <p>{children}</p>

      <div className="flex flex-col sm:flex-row items-center gap-2 ">
        <button
          className={`btn btn-circle btn-sm ${loadingClass}`}
          onClick={() => handleIncrementGoals(team)}
        >
          {loadingClass === 'loading' ? null : <PlusIcon />}
        </button>
        <div className={`h-14 w-14  rounded-full ${colorClass}`}></div>
        <button
          className={`btn btn-circle btn-sm ${loadingClass}`}
          onClick={() => handleDecrementGoals(team)}
        >
          {loadingClass === 'loading' ? null : <MinusIcon />}
        </button>
      </div>
    </div>
  );
};
