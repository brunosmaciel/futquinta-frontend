import { createContext, SetStateAction, useState } from 'react';

import { useSWRConfig } from 'swr';

import { api } from '../services/axios';

type ScoreboardType = {
  greenGoals: number;
  whiteGoals: number;
  setWhiteGoals: React.Dispatch<SetStateAction<number>>;
  setGreenGoals: React.Dispatch<SetStateAction<number>>;
  updateScoreOnApi: (gameId: number) => Promise<void>;
};

const ScoreboardContext = createContext({} as ScoreboardType);

const ScoreboardProvider = ({ children }: any) => {
  const [greenGoals, setGreenGoals] = useState<number>(0);
  const [whiteGoals, setWhiteGoals] = useState<number>(0);

  async function updateScoreOnApi(gameId: number) {
    await api.put(`/games/${gameId}`, {
      whiteGoals,
      greenGoals,
    });
  }
  return (
    <ScoreboardContext.Provider
      value={{ whiteGoals, greenGoals, setWhiteGoals, setGreenGoals, updateScoreOnApi }}
    >
      {children}
    </ScoreboardContext.Provider>
  );
};

export { ScoreboardProvider, ScoreboardContext };
