import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { PlusCircleIcon } from 'lucide-react';

import { PlayerProfile } from '../../../..';
import { useButtonLoading } from '../../../hooks/useButtonLoading';
import { api } from '../../../services/axios';
type Inputs = {
  name: string;
  photo: FileList;
  guest: boolean;
  color: string;
  number: string;
};
type CreatePlayerModalProps = {
  children: React.ReactNode;
};
export const CreatePlayerModal = ({ children }: CreatePlayerModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, formState } = useForm<Inputs>();
  const { loadingClass, setButtonLoading } = useButtonLoading();

  const onSubmit: SubmitHandler<Inputs> = async ({ guest, name, number }) => {
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
      <label onClick={() => setIsOpen((prev) => !prev)} className="btn flex gap-2">
        <PlusCircleIcon size={40} />
        {children}
      </label>

      {/* Put this part before </body> tag */}
      <input
        type="checkbox"
        id="my-modal-3"
        className="modal-toggle"
        checked={isOpen}
        onChange={() => ''}
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            onClick={() => setIsOpen((prev) => !prev)}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold mb-2">Novo jogador</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
            <div className="form-control w-[320px]  mx-auto gap-2">
              <label className="input-group input-group-vertical ">
                <span>Nome</span>
                <input
                  type="text"
                  placeholder="Nome do jogador"
                  className="input input-bordered"
                  {...register('name')}
                />
                <span className="mt-4">Número do jogador</span>
                <input
                  type="text"
                  placeholder="Ex: 10"
                  className="input input-bordered"
                  {...register('number')}
                  autoComplete="off"
                  pattern="[0-9]*"
                  inputMode="numeric"
                />
              </label>
              <label className="flex items-center gap-4  justify-end">
                <span className="label-text">Convidado</span>
                <input {...register('guest')} type="checkbox" className="checkbox" />
              </label>

              <h1>{formState.errors.photo?.message}</h1>
              <button
                type="submit"
                className={`btn btn-primary w-fit self-center mt-6 ${loadingClass} `}
              >
                Criar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
