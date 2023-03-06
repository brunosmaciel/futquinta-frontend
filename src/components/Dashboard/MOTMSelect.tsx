/* eslint-disable react/no-unknown-property */
import { useState } from 'react';

import { SWRConfig, useSWRConfig } from 'swr';

import { PlayerStats } from '../../..';
import { api } from '../../services/axios';

export type MOTMSelectProps = {
  MOTM: string;
  players: PlayerStats[];
  gameId: number;
};
type MOTMType = {
  name: string;
  team: 'WHITE' | 'GREEN';
};
const MOTMSelect = ({ MOTM: currentMOTM, players, gameId }: MOTMSelectProps) => {
  const { mutate } = useSWRConfig();
  const [newMOTM, setNewMOTM] = useState('');
  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, team } = JSON.parse(e.target.value) as MOTMType;

    try {
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <>
      <select
        className="select select-bordered select-sm w-30 max-w-xs"
        value={newMOTM || currentMOTM || 'Selecione'}
        onChange={handleChange}
      >
        <option>{newMOTM || currentMOTM || 'Selecione'}</option>
        {players?.map((player) => (
          <option
            key={player.id}
            value={JSON.stringify({
              id: player.gameId,
              name: player.name,
              team: player.currentTeam,
            })}
          >
            {player.name}
          </option>
        ))}
      </select>
    </>
  );
};

export { MOTMSelect };
