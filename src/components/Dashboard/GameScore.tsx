import { useContext, useEffect } from 'react';

import { Game } from '../../..';
import { ScoreboardContext } from '../../contexts/ScoreboardContext';

export type GameScore = {
  game: Game;
};
const GameScore = ({ game }: GameScore) => {
  const { whiteGoals, greenGoals, setWhiteGoals, setGreenGoals } = useContext(ScoreboardContext);
  useEffect(() => {
    const white = game?.players
      .filter((player) => player.currentTeam === 'WHITE')
      .map((goals) => goals.goals)
      .reduce((acc, current) => acc + current, 0);
    const green = game?.players
      .filter((player) => player.currentTeam === 'GREEN')
      .map((goals) => goals.goals)
      .reduce((acc, current) => acc + current, 0);

    setWhiteGoals(white);
    setGreenGoals(green);
  }, []);

  return (
    <>
      <div className=" flex items-center justify-center gap-8 my-8">
        <div className="flex flex-col items-center">
          <p>Branco</p>
          <div className="h-14 w-14 rounded-full bg-white"></div>
        </div>
        <div className="flex gap-2 text-3xl ">
          <p>{game.whiteGoals}</p>
          <span>-</span>
          <p>{game.greenGoals}</p>
        </div>
        <div className="flex flex-col items-center">
          <p>Verde</p>
          <div className="h-14 w-14  rounded-full bg-green-700"></div>
        </div>
      </div>
    </>
  );
};

export { GameScore };
