import useSWR from 'swr';

import { PlayerProfile } from '../../../..';
import { usePlayers } from '../../../hooks/usePlayers';

const Jogadores = () => {
  const { players, isLoading } = usePlayers();

  if (isLoading) {
    return <h1>carregando</h1>;
  }
  if (!isLoading) {
    return (
      <>
        <h1>Jogadores PAGE</h1>
        {players?.map((player) => (
          <p key={player.id}>{player.name}</p>
        ))}
      </>
    );
  }
};
export default Jogadores;
