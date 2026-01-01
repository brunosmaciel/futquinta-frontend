import { GameType } from '../../../..';
import { GameScoreText } from './GameScoreText';

type Props = {
  game: GameType;
};
export const GameScore = ({ game }: Props) => {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-8 my-8">
      <GameScoreText team={'WHITE'} game={game} colorClass={'bg-white'}>
        <span>Time Branco</span>
      </GameScoreText>
      <div className="flex gap-2 sm:text-3xl text-lg ">
        <p className="w-[12px] sm:w-auto">{game.whiteGoals}</p>
        <span>-</span>
        <p className="w-[12px] sm:w-auto">{game.greenGoals}</p>
      </div>
      <GameScoreText team={'GREEN'} game={game} colorClass={'bg-green-700'}>
        <span>Time Preto</span>
      </GameScoreText>
    </div>
  );
};
