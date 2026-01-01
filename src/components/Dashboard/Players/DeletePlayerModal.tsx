

import { AlertCircle } from 'lucide-react';
import { mutate } from 'swr';

import { PlayerProfile } from '../../../..';
import { api } from '../../../services/axios';

type DeletePlayerModalProps = {
  children: React.ReactNode;
  player: PlayerProfile;
};
export const DeletePlayerModal = ({ children, player }: DeletePlayerModalProps) => {
  const handleDeletePlayer = async () => {
    try {
      const { data } = await api.delete(`/players/${player.id}`);

      mutate('/players');

      alert(data);
    } catch (err: any) {
      alert('Internal server error');
    }
  };
  return (
    <>
      {/* The button to open modal */}
      <label htmlFor={`${player.slug}`}>{children}</label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id={`${player.slug}`} className="modal-toggle" onChange={() => ''} />
      <label htmlFor={`${player.slug}`} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <div className=" w-full h-full">
            <h3 className="py-4 text-xl">Deseja realmente excluir {player.name}?</h3>
            <div className="flex gap-2 items-center justify-center text-error">
              <AlertCircle />
              <i className="text-sm text-error">
                Essa ação é irreversivel e apagará todos os dados
              </i>
            </div>
            <div className="flex gap-4 justify-center ">
              <button className="btn btn-primary mt-2" onClick={handleDeletePlayer}>
                Sim
              </button>
              <label htmlFor={`${player.slug}`} className="btn btn-outline mt-2">
                Cancelar
              </label>
            </div>
          </div>
        </label>
      </label>
    </>
  );
};
