import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useRouter } from 'next/navigation';

import { PlayerProfile } from '../../../..';
import { api } from '../../../services/axios';
type Inputs = {
  name: string;
  whiteShirt: FileList;
  greenShirt: FileList;
};
export default function CreatePlayer() {
  const { push } = useRouter();
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({ name }) => {
    try {
      const {
        data: { slug },
      } = await api.post<PlayerProfile>('/players', {
        name,
      });

      push(`/dashboard/jogadores/`);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col items-center">
      <h1>Criar novo jogador</h1>
      <div className="form-control w-[320px]  mx-auto gap-6">
        <label className="input-group input-group-vertical ">
          <span>Nome</span>
          <input
            type="text"
            placeholder="Nome do jogador"
            className="input input-bordered"
            {...register('name')}
          />
        </label>
        {/* <label className="input-group input-group-vertical ">
          <span>Foto com camisa branca</span>
          <input
            {...register('whiteShirt')}
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
          />
        </label> */}
        {/* <label className="input-group input-group-vertical ">
          <span>Foto com camisa verde</span>
          <input
            {...register('greenShirt')}
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
          />
        </label> */}
        <button type="submit" className="btn btn-primary w-fit self-center mt-6">
          Criar
        </button>
      </div>
    </form>
  );
}
