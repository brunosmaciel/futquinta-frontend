/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState } from 'react';

import { useSWRConfig } from 'swr';

import { Game, PlayerProfile } from '../..';
import { api } from '../services/axios';

export type MOTMContainerProps = {
  players: PlayerProfile[] | undefined;
  game: Game;
};
type MOTMType = {
  playerId: number;
  gameId: number;
  team: 'WHITE' | 'GREEN';
  name: string;
};

const MOTMContainer = ({ game }: MOTMContainerProps) => {
  const whitePlayers = game.players.filter((player) => player.currentTeam === 'WHITE');
  const greenPlayers = game.players.filter((player) => player.currentTeam === 'GREEN');
  const [isLoading, setIsLoading] = useState<'loading' | 'not_loading'>('not_loading');
  const [newWhiteMOTM, setNewWhiteMOTM] = useState<MOTMType>({} as MOTMType);
  const [newGreenMOTM, setNewGreenMOTM] = useState<MOTMType>({} as MOTMType);
  const [currentWhiteMOTM, setCurrentWhiteMOTM] = useState('');
  const [currentGreenMOTM, setCurrentGreenMOTM] = useState('');
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (game.MOTM.length > 0) {
      const whiteMOTM = game.MOTM.filter((player) => player.team === 'WHITE');
      const greenMOTM = game.MOTM.filter((player) => player.team === 'GREEN');

      if (whiteMOTM.length > 0) {
        setCurrentWhiteMOTM(whiteMOTM[0].player.name);
      }
      if (greenMOTM.length > 0) {
        setCurrentGreenMOTM(greenMOTM[0].player.name);
      }
    }
  }, []);
  const handleMOTMSave = async () => {
    setIsLoading('loading');
    const allMOTM = [newWhiteMOTM, newGreenMOTM];

    for await (const motm of allMOTM) {
      await api.post(`/motm/${motm.gameId}/${motm.playerId}`, {
        team: motm.team,
      });
    }
    setIsLoading('not_loading');
    mutate(`games/${game.id}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = JSON.parse(e.target.value) as MOTMType;

    const newMOTM: MOTMType = {
      team: value.team,
      gameId: value.gameId,
      playerId: value.playerId,
      name: value.name,
    };
    if (newMOTM.team === 'WHITE') {
      setNewWhiteMOTM(newMOTM);
    }
    if (newMOTM.team === 'GREEN') {
      setNewGreenMOTM(newMOTM);
    }
  };

  return (
    <div className=" flex w-96 flex-col self-center items-center gap-4 ">
      <h1 className="font-bold text-xl">Melhores da partida</h1>
      <div className="w-[90%] h-22 bg-[#131A21] flex rounded-2xl justify-between px-4 py-2 ">
        <select
          className="select select-bordered select-sm w-30 max-w-xs"
          value={newWhiteMOTM.name || currentWhiteMOTM || 'Selecione'}
          onChange={handleChange}
        >
          <option>{newWhiteMOTM.name || currentWhiteMOTM || 'Selecione'}</option>
          {whitePlayers?.map((player) => (
            <option
              key={player.id}
              value={JSON.stringify({
                gameId: player.gameId,
                playerId: player.playerId,
                team: player.currentTeam,
                name: player.name,
              })}
            >
              {player.name}
            </option>
          ))}
        </select>
        <div className="bg-white w-[2px]"></div>
        <select
          className="select select-bordered select-sm w-30 max-w-xs"
          value={newGreenMOTM.name || currentGreenMOTM || 'Selecione'}
          onChange={handleChange}
        >
          <option>{newGreenMOTM.name || currentGreenMOTM || 'Selecione'}</option>
          {greenPlayers?.map((player) => (
            <option
              key={player.id}
              value={JSON.stringify({
                gameId: player.gameId,
                playerId: player.playerId,
                team: player.currentTeam,
                name: player.name,
              })}
            >
              {player.name}
            </option>
          ))}
        </select>
      </div>
      {game.MOTM.length === 2 ? (
        <>
          <button className="btn btn-xs btn-outline">Editar</button>
        </>
      ) : (
        <>
          <button className={`btn btn-xs btn-outline ${isLoading}`} onClick={handleMOTMSave}>
            Salvar escolhas
          </button>
        </>
      )}
    </div>
  );
};

export { MOTMContainer };
