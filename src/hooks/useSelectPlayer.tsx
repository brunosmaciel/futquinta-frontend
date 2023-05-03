import { createContext, useState } from 'react';

export type GamePlayersList = {
  id: number;
  name: string;
  currentTeam: 'WHITE' | 'GREEN';
  function: 'GOALKEEPER' | 'OUTFIELDPLAYER';
};
type ChoseTeamContextProps = {
  add: (player: GamePlayersList) => void;
  remove: (name: string, team: 'WHITE' | 'GREEN') => void;
  reset: () => void;
  players: GamePlayersList[];
};
export const ChoseTeamContext = createContext({} as ChoseTeamContextProps);
export function ChoseTeamContextProvider({ children }: { children: React.ReactNode }) {
  const [players, setPlayers] = useState<GamePlayersList[]>([]);

  const reset = () => {
    setPlayers([]);
  };

  const add = (player: GamePlayersList) => {
    setPlayers((prev) => [...prev, player]);
  };
  const remove = (name: string, team: 'WHITE' | 'GREEN') => {
    const playerRemoved = players.filter(
      (playerStat) => playerStat.name === name && playerStat.currentTeam === team
    );
    const newPlayerList = players.filter((player) => player !== playerRemoved[0]);

    setPlayers(newPlayerList);
  };

  return (
    <ChoseTeamContext.Provider value={{ reset, remove, add, players }}>
      {children}
    </ChoseTeamContext.Provider>
  );
}
