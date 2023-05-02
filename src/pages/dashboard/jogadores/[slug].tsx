/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import useSWR, { mutate } from 'swr';

import { PlayerProfile } from '../../../..';
import { LoadingSpin } from '../../../components/Loading';
import { UpdateProfilePictureModal } from '../../../components/UploadProfilePictureModal';
import { slugify } from '../../../functions/slugify';
import { api } from '../../../services/axios';
import FourOhFour from '../../404';

export type Inputs = {
  name: string;
  shirtNumber: string;
  isGuest: boolean;
};
const Jogador = () => {
  const { get } = useSearchParams();
  const slug = get('slug');
  const { data: player, error, isLoading } = useSWR<PlayerProfile>(`/players/${slug}`);
  const { register, handleSubmit } = useForm<Inputs>();
  const [IsBtnDisable, setBtnDisable] = useState<'btn-disabled' | 'false'>('btn-disabled');
  const { push } = useRouter();
  const onSubmit = async (data: Inputs) => {
    const { name, isGuest, shirtNumber } = data;

    try {
      await api.put<PlayerProfile>(`/players/${player?.id}`, {
        name,
        role: isGuest ? 'GUEST' : 'PERMANENT',
        shirtNumber: +shirtNumber,
        slug: slugify(name),
      });
      push(`/dashboard/jogadores/${slugify(name)}`);
      mutate(`/players/${slug}`);
      setBtnDisable('btn-disabled');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== e.target.defaultValue) {
      setBtnDisable('false');
      return;
    }
    setBtnDisable('btn-disabled');
  };

  if (error) {
    return <FourOhFour />;
  }
  if (isLoading) {
    return <LoadingSpin />;
  }
  return (
    <>
      {player && (
        <div className="flex flex-col">
          <div className="flex flex-col items-center gap-5 py-2  w-[90%] mx-auto cursor-pointer">
            {player?.role === 'GUEST' ? (
              <span className="indicator-item badge badge-primary">Convidado</span>
            ) : null}

            <UpdateProfilePictureModal player={player} />

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="container mx-auto flex flex-col items-center gap-4 "
            >
              <div className="flex items-center gap-2">
                <span className="label-text">Convidado</span>
                <input
                  {...register('isGuest')}
                  type="checkbox"
                  defaultChecked={player?.role === 'GUEST' ? true : false}
                  className="checkbox checkbox-primary"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col ">
                <input
                  {...register('name')}
                  type="text"
                  className="input input-bordered input-neutral"
                  defaultValue={player.name}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <label htmlFor=""></label>
              </div>
              <div className="divider"></div>
              <div className="flex flex-wrap gap-2">
                <div className=" bg-[#191D24] w-[68px] h-[68px]  p-2 rounded-lg flex flex-col items-center">
                  <span className="text-sm">Número</span>
                  <input
                    {...register('shirtNumber')}
                    type="text"
                    className="input input-ghost text-center w-14"
                    defaultValue={player?.shirtNumber}
                    onChange={handleChange}
                    autoComplete="off"
                    pattern="[0-9]*"
                    inputMode="numeric"
                  />
                </div>
              </div>
              <button className={`btn btn-primary w-fit ${IsBtnDisable}`}>Salvar</button>
            </form>
            <h1 className="text-xl font-bold"></h1>
          </div>
        </div>
      )}
    </>
  );
};

export default Jogador;
