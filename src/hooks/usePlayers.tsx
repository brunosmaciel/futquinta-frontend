import useSWR from 'swr';

import { PlayerProfile } from '../..';
const usePlayers = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWR<PlayerProfile[]>('/players');

  if (data) {
    const goalkeepers = data?.filter((player) => player.playerPosition === 'GOALKEEPER');
    const outfieldPlayer = data?.filter((player) => player.playerPosition === 'OUTFIELDPLAYER');
    const playersInAlphabeticOrder = outfieldPlayer.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    const players = [...goalkeepers, ...playersInAlphabeticOrder];

    return { players, error, isLoading, isValidating, mutate };
  }
  return { data, error, isLoading, isValidating, mutate };
};

export { usePlayers };
