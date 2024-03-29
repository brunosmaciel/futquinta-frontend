import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CameraIcon } from 'lucide-react';
import Image from 'next/image';
import { useSWRConfig } from 'swr';

import { Game } from '../..';
import { api } from '../services/axios';

export type GamePictureProps = {
  game: Game;
};
type GamePictureInput = {
  photo: FileList;
};
const GamePicure = ({ game }: GamePictureProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<'loading' | 'not_loading'>('not_loading');
  const { mutate } = useSWRConfig();

  const { register, handleSubmit, watch } = useForm<GamePictureInput>();
  const photoPreview = watch('photo');

  const handleUpload = async ({ photo }: GamePictureInput) => {
    if (photo.length === 0) return;
    const file = photo[0];
    try {
      const formData = new FormData();
      formData.append('game_picture', file);
      await api.put(`/games/picture/${game.id}`, formData);
      mutate(`/games/${game.id}`);
      setIsOpen(false);
    } catch (err: any) {
      setIsLoading('not_loading');

      toast.error(err.message);
    }
  };
  return (
    <>
      {game.gamePicture ? (
        <>
          <Image
            alt="alt"
            src={game.gamePicture}
            className="w-max border-[1px] rounded-lg cursor-pointer"
            width={120}
            height={30}
            quality={100}
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </>
      ) : (
        <>
          <button className="btn btn-sm btn-primary" onClick={() => setIsOpen((prev) => !prev)}>
            Carregar foto do jogo
          </button>
        </>
      )}

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
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">Foto do jogo</h3>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit(handleUpload)}>
            {photoPreview && photoPreview.length === 0 && (
              <label
                htmlFor="game-photo"
                className="hover:bg-base-200/10  transition-all cursor-pointer flex items-center justify-center w-full h-48 border-2 mt-4 border-dashed border-primary rounded-lg"
              >
                <CameraIcon size={60} />
              </label>
            )}

            <input type="file" id="game-photo" className="hidden" {...register('photo')} />
            {photoPreview && photoPreview.length > 0 ? (
              <>
                <Image
                  alt="alt"
                  src={URL.createObjectURL(photoPreview[0])}
                  className="mt-4  border-[1px] rounded-lg cursor-pointer w-full max-w-xs"
                  width={280}
                  height={30}
                  quality={100}
                  onClick={() => setIsOpen((prev) => !prev)}
                />
              </>
            ) : null}

            {photoPreview && photoPreview.length > 0 ? (
              <button className={`btn w-fit btn-primary ${isLoading}`}>Salvar</button>
            ) : null}
          </form>
        </div>
      </div>
    </>
  );
};

export { GamePicure };
