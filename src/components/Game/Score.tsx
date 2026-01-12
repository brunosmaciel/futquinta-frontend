interface IScoreProps {
  whiteGoals: number;
  greenGoals: number;
}

export function Score({ whiteGoals, greenGoals }: IScoreProps) {
  return (
    <div className=" gap-2 min-w-[300px] h-20 mt-4 flex">
      <div className="w-16 flex flex-col items-center justify-center gap-2">
        <div className="h-14 w-14 bg-primary rounded-full"></div>
      </div>
      <div className=" flex-1 flex items-center justify-center text-4xl gap-4">
        <span>{whiteGoals}</span>
        <span>X</span>
        <span>{greenGoals}</span>
      </div>
      <div className="w-16 flex flex-col items-center justify-center">
        <div className="h-14 w-14 bg-secondary rounded-full "></div>
      </div>
    </div>
  );
}
