interface IPlayerProfileGameResultProps {
  result: 'V' | 'D' | 'E';
}

export function PlayerProfileGameResult({ result }: IPlayerProfileGameResultProps) {
  if (result === 'D') {
    return (
      <div className="bg-red-500 rounded-full h-6 w-6 flex items-center justify-center">
        <span className="font-bold">{result}</span>
      </div>
    );
  }
  if (result === 'E') {
    return (
      <div className="bg-yellow-600 rounded-full h-6 w-6 flex items-center justify-center">
        <span className="font-bold">{result}</span>
      </div>
    );
  }

  return (
    <div className="bg-green-500 rounded-full h-6 w-6 flex items-center justify-center">
      <span className="font-bold">{result}</span>
    </div>
  );
}
