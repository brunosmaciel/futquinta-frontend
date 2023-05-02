import { PlusIcon, MinusIcon } from 'lucide-react';
type GameScoreTextProps = {
  team: 'GREEN' | 'WHITE';
  handleIncrementGoals: (team: 'WHITE' | 'GREEN') => void;
  handleDecrementGoals: (team: 'WHITE' | 'GREEN') => void;
  colorClass: string;
  children: React.ReactNode;
};
export const GameScoreText = ({
  children,
  handleDecrementGoals,
  handleIncrementGoals,
  team,
  colorClass,
}: GameScoreTextProps) => {
  return (
    <div className="flex flex-col gap-[1px] items-center">
      <p>{children}</p>

      <div className="flex flex-col sm:flex-row items-center gap-2 ">
        <button className={`btn btn-circle btn-sm `} onClick={() => handleIncrementGoals(team)}>
          <PlusIcon />
        </button>
        <div className={`h-14 w-14  rounded-full ${colorClass}`}></div>
        <button className={`btn btn-circle btn-sm `} onClick={() => handleDecrementGoals(team)}>
          <MinusIcon />
        </button>
      </div>
    </div>
  );
};
