import { useForm, useFieldArray } from 'react-hook-form';

import Image from 'next/image';
import { useSWRConfig } from 'swr';

import { PlayerProfile } from '../..';
import { api } from '../services/axios';
import { profilePicturePlaceholder } from '../utils/profilePicturePlaceholder';

export type UploadProfilePictureModal = {
  player: PlayerProfile;
};

export type FieldArrayType = {
  color: 'WHITE' | 'GREEN';
  file: FileList;
};
export type Inputs = {
  photo: FileList;
  color: string;
  photos: FieldArrayType[];
};
const UpdateProfilePictureModal = ({ player }: UploadProfilePictureModal) => {
  const { control, register, watch, handleSubmit } = useForm<Inputs>();
  const { mutate } = useSWRConfig();
  const { fields, append } = useFieldArray({
    control,
    name: 'photos',
  });
  const getCurrentProfilePicture = (player: PlayerProfile): string => {
    if (player.currentPicture === 'WHITE') return player.whiteShirtpicture!;
    if (player.currentPicture === 'GREEN') return player.greenShirtpicture!;

    return profilePicturePlaceholder(player.slug);
  };
  const currentShirtColorSelection = watch('color');
  const handleUpload = async (data: Inputs) => {
    const { color, photo, photos } = data;
    try {
      const formData = new FormData();
      formData.append('shirtColor', color);
      formData.append('avatar', photo[0]);
      const { data } = await api.post(`players/upload/${player.id}`, formData);
      mutate(`/players/${player.slug}`);
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <div className="gap-[5px] flex flex-col items-center">
      <i className="text-sm relative">Clique na foto para editar</i>
      <label htmlFor="my-modal-3" className="">
        <Image
          src={getCurrentProfilePicture(player)}
          alt="Foto de perfil do jogador"
          width={300}
          height={300}
          className="rounded-full w-32 h-32 border-2 cursor-pointer"
          priority
        />
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </label>
          <h3 className="text-lg font-bold">Enviar imagem</h3>
          <form className="my-2 flex flex-col" onSubmit={handleSubmit(handleUpload)}>
            <div className="flex w-full justify-between items-center">
              <div>
                <label htmlFor="photo" className="btn btn-primary  btn-sm">
                  Enviar arquivo
                </label>
                <input
                  accept="image/*"
                  type="file"
                  id="photo"
                  className="hidden"
                  {...register('photo')}
                />
              </div>
              <div className="flex flex-col ">
                <h4>Selecione a cor da camisa</h4>
                <div className="flex gap-4">
                  <label htmlFor="shirtColor" className="">
                    Verde
                  </label>
                  <input
                    type="radio"
                    value={'GREEN'}
                    className="radio radio-primary"
                    {...register('color')}
                  />
                  <label htmlFor="shirtColor" className="">
                    Branco
                  </label>
                  <input
                    type="radio"
                    value={'WHITE'}
                    className="radio radio-white"
                    {...register('color')}
                  />
                </div>
              </div>
            </div>
            {fields.map((field, index) => (
              <div key={field.id}>
                <div className="divider divider-vertical"></div>
                <div key={field.id} className="flex w-full justify-between items-center">
                  <div>
                    <label htmlFor={`photo-${index}`} className="btn btn-primary  btn-sm">
                      Enviar arquivo
                    </label>
                    <input
                      type="file"
                      id={`photo-${index}`}
                      className="hidden"
                      {...register(`photos.${index}.file`)}
                    />
                  </div>
                  <div className="flex flex-col ">
                    <h4>Selecione a cor da camisa</h4>
                    <div className="flex gap-4">
                      <label htmlFor="shirtColor" className="">
                        Verde
                      </label>
                      <input
                        type="radio"
                        value={'GREEN'}
                        className="radio radio-primary"
                        {...register(`photos.${index}.color`)}
                      />
                      <label htmlFor="shirtColor" className="">
                        Branco
                      </label>
                      <input
                        type="radio"
                        value={'WHITE'}
                        className="radio radio-white"
                        {...register(`photos.${index}.color`)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div
              className="btn w-fit btn-md mt-6C self-end"
              role="button"
              onClick={(e) => {
                append({
                  file: [] as unknown as FileList,
                  color: currentShirtColorSelection === 'GREEN' ? 'WHITE' : 'GREEN',
                });
              }}
            >
              Adicionar outra foto
            </div>
            <button className="btn btn-primary w-fit" type="submit">
              Salvar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export { UpdateProfilePictureModal };
