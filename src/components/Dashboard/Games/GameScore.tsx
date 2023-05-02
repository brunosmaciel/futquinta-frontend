import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { mutate } from 'swr';

import { Game } from '../../../..';
import { api } from '../../../services/axios';
import { GameScoreText } from './GameScoreText';

type Props = {
  game: Game;
};
export const GameScore = ({ game }: Props) => {
  useEffect(() => {
    mutate(`/games/${game?.id}`);
  }, [game.whiteGoals, game.greenGoals]);

  const handleIncrementGoals = async (team: 'WHITE' | 'GREEN') => {
    try {
      await api.put(`/games/goals/increment/${game.id}`, { team });
      mutate(`/games/${game?.id}`);
    } catch (err: any) {
      toast.error('Internal Server Error');
    }
  };
  const handleDecrementGoals = async (team: 'WHITE' | 'GREEN') => {
    try {
      await api.put(`/games/goals/decrement/${game.id}`, { team });
      mutate(`/games/${game?.id}`);
    } catch (err: any) {
      toast.error('Internal Server Error');
    }
  };
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-8 my-8">
      <GameScoreText
        team={'WHITE'}
        handleIncrementGoals={handleIncrementGoals}
        handleDecrementGoals={handleDecrementGoals}
        colorClass={'bg-white'}
      >
        <span>Time Branco</span>
      </GameScoreText>
      <div className="flex gap-2 sm:text-3xl text-lg ">
        <p className="w-[12px] sm:w-auto">{game.whiteGoals}</p>
        <span>-</span>
        <p className="w-[12px] sm:w-auto">{game.greenGoals}</p>
      </div>
      <GameScoreText
        team={'GREEN'}
        handleIncrementGoals={handleIncrementGoals}
        handleDecrementGoals={handleDecrementGoals}
        colorClass={'bg-green-700'}
      >
        <span>Time Verde</span>
      </GameScoreText>
    </div>
  );
};
