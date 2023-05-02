import useSWR from 'swr';

import { PlayerProfile } from '../../../..';
import { CreatePlayerModal } from '../../../components/Dashboard/Players/CreatePlayerModal';
import { PlayerContainer } from '../../../components/Dashboard/Players/PlayerContainer';
import { LoadingSpin } from '../../../components/Loading';
import FourOhFour from '../../404';
const Jogadores = () => {
  const { data, isLoading, error } = useSWR<PlayerProfile[]>('/players');

  if (isLoading) return <LoadingSpin />;

  if (error) return <FourOhFour />;

  return (
    <div>
      <div className="flex items-center py-2 border-b-[1px] border-neutral-900 w-[94%] mx-auto">
        <CreatePlayerModal>Novo jogador</CreatePlayerModal>
      </div>
      {data?.map((player) => {
        return <PlayerContainer key={player.id} player={player} />;
      })}
    </div>
  );
};
export default Jogadores;
