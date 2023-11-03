import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Plus } from 'lucide-react';

import { PlayerProfile } from '../../../..';
import { useButtonLoading } from '../../../hooks/useButtonLoading';
import { api } from '../../../services/axios';
import { Button } from '../../Button';
type Inputs = {
  name: string;
  photo: FileList;
  guest: boolean;
  color: string;
  number: string;
  playerFunction: 'OUTFIELDPLAYER' | 'GOALKEEPER';
  isGuest: boolean;
};

export const CreatePlayerModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, formState } = useForm<Inputs>();
  const { isButtonLoading, setButtonLoading } = useButtonLoading();

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    const { guest, name, number, playerFunction } = formData;

    setButtonLoading(true);
    const data = {
      name,
      role: guest ? 'GUEST' : 'PERMANENT',
      shirtNumber: Number(number),
    };

    try {
      await api.post<PlayerProfile>('/players', data);

      toast.success(`Jogador ${name} criado com sucesso`);
      setButtonLoading(false);
      setIsOpen(false);
    } catch (err: any) {
      toast.error(err.message);
      setButtonLoading(false);
    }
  };
  return (
    <>
      <div
        className="tooltip z-50 tooltip-left fixed bottom-4 right-4 tooltip-secondary"
        data-tip="Criar jogador"
      >
        <label
          onClick={() => setIsOpen((prev) => !prev)}
          className="cursor-pointer text-inherit btn btn-primary btn-circle "
        >
          <Plus data-tip="Criar um novo jogador" size={30} />
        </label>
      </div>

      {/* Put this part before </body> tag */}
      <input
        type="checkbox"
        id="my-modal-3"
        className="modal-toggle"
        checked={isOpen}
        onChange={() => ''}
      />
      <div className="modal">
        <div className="modal-box relative max-w-xs">
          <div className="flex flex-row-reverse justify-between">
            <label onClick={() => setIsOpen((prev) => !prev)} className="btn btn-sm btn-circle ">
              ✕
            </label>
          </div>
          <div className="flex items-center justify-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center gap-2 w-full max-w-xs "
            >
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Nome</span>
                </label>
                <input
                  type="text"
                  placeholder="Nome do jogador"
                  className="input input-bordered w-full "
                  {...register('name')}
                />
              </div>
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Camiseta</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: 10"
                  className="input input-bordered w-full "
                  {...register('number')}
                  autoComplete="off"
                  pattern="[0-9]*"
                  inputMode="numeric"
                />
              </div>
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Posição</span>
                </label>
                <select
                  {...register('playerFunction')}
                  className="select select-bordered w-full max-w-xs"
                >
                  <option value={'OUTFIELDPLAYER'}>Linha</option>
                  <option value={'GOALKEEPER'}>Goleiro</option>
                </select>
              </div>

              <Button isLoading={isButtonLoading} className="w-full mt-6 btn btn-primary">
                Criar
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
