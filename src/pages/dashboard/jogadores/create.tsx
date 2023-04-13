import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useRouter } from 'next/navigation';

import { PlayerProfile } from '../../../..';
import { api } from '../../../services/axios';
type Inputs = {
  name: string;
  photo: FileList;
  guest: boolean;
  color: string;
};
export default function CreatePlayer() {
  const { push } = useRouter();
  const { register, handleSubmit, formState, watch } = useForm<Inputs>();

  const { photo, name } = watch();

  const onSubmit: SubmitHandler<Inputs> = async ({ guest, name }) => {
    const data = {
      name,
      role: guest ? 'GUEST' : 'PERMANENT',
    };
    console.log(data);
    return;
    try {
      await api.post<PlayerProfile>('/players', {
        name,
        role: guest ? 'GUEST' : 'PERMANENT',
      });

      push(`/dashboard/jogadores/`);
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
      {photo && photo.length > 0 ? (
        <img src={URL.createObjectURL(photo[0])} alt="" className="w-36 h-36 rounded-full my-5" />
      ) : null}
      <h1 className="mb-4">{name ? name : 'Criar novo jogador'}</h1>
      <div className="form-control w-[320px]  mx-auto gap-2">
        <label className="input-group input-group-vertical ">
          <span>Nome</span>
          <input
            type="text"
            placeholder="Nome do jogador"
            className="input input-bordered"
            {...register('name')}
          />
        </label>
        <label className="flex items-center gap-4  justify-end">
          <span className="label-text">Convidado</span>
          <input {...register('guest')} type="checkbox" className="checkbox" />
        </label>

        {/* <label className=" flex gap-2 ">
          <label htmlFor="photo" className="btn btn-primary w-fit">
            Enviar foto
          </label>
          <input
            {...register('photo')}
            type="file"
            id="photo"
            className=" hidden file-input file-input-bordered file-input-primary w-full max-w-xs"
            accept="image/*"
          />
          <div className="flex items-center gap-2">
            <label htmlFor="" className="flex gap-2">
              Verde
              <input
                type="radio"
                className="radio radio-primary"
                value="verde"
                {...(register('color'), { required: true })}
              />
            </label>
            <label htmlFor="" className="flex gap-2">
              Branco
              <input
                type="radio"
                className="radio radio-white"
                value="branco"
                {...(register('color'), { required: true })}
              />
            </label>
          </div>
        </label> */}
        <h1>{formState.errors.photo?.message}</h1>
        <button type="submit" className="btn btn-primary w-fit self-center mt-6">
          Criar
        </button>
      </div>
    </form>
  );
}
