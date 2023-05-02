import { createContext, useState } from 'react';

export type GamePlayersList = {
  id: number;
  name: string;
  currentTeam: 'WHITE' | 'GREEN';
  function: 'GOALKEEPER' | 'OUTFIELDPLAYER';
};
type ChoseTeamContextProps = {
  add: (player: GamePlayersList) => void;
  players: GamePlayersList[];
};
export const ChoseTeamContext = createContext({} as ChoseTeamContextProps);
export function ChoseTeamContextProvider({ children }: { children: React.ReactNode }) {
  const [players, setPlayers] = useState<GamePlayersList[]>([]);

  const add = (player: GamePlayersList) => {
    setPlayers((prev) => [...prev, player]);
  };

  return <ChoseTeamContext.Provider value={{ add, players }}>{children}</ChoseTeamContext.Provider>;
}
