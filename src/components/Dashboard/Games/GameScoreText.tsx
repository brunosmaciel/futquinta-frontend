import { PlusIcon, MinusIcon } from 'lucide-react';
import { mutate } from 'swr';

import { GameType } from '../../../..';
import { useButtonLoading } from '../../../hooks/useButtonLoading';
import { api } from '../../../services/axios';
import { Button } from '../../Button';
type GameScoreTextProps = {
  team: 'GREEN' | 'WHITE';
  game: GameType;

  colorClass: string;
  children: React.ReactNode;
};
export const GameScoreText = ({
  children,

  game,
  team,
  colorClass,
}: GameScoreTextProps) => {
  const { isButtonLoading, setButtonLoading } = useButtonLoading();
  const handleIncrementGoals = async (team: 'WHITE' | 'GREEN') => {
    setButtonLoading(true);
    try {
      await api.put(`/games/goals/increment/${game.id}`, { team });
      await mutate(`/games/${game?.id}`);
      setButtonLoading(false);
    } catch (err: any) {
      alert('Internal Server Error,tinha toast');
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
      alert('Internal Server Error,tinha toast');
      setButtonLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-[1px] items-center">
      <p>{children}</p>

      <div className="flex flex-col sm:flex-row items-center gap-2 ">
        <Button
          isLoading={isButtonLoading}
          className={`btn btn-circle btn-sm `}
          onClick={() => handleIncrementGoals(team)}
        >
          {isButtonLoading === true ? null : <PlusIcon />}
        </Button>
        <div className={`h-14 w-14  rounded-full ${colorClass}`}></div>
        <Button
          isLoading={isButtonLoading}
          className={`btn btn-circle btn-sm `}
          onClick={() => handleDecrementGoals(team)}
        >
          {isButtonLoading === true ? null : <MinusIcon />}
        </Button>
      </div>
    </div>
  );
};
