import { useState } from 'react';
import { toast } from 'react-toastify';

import Image from 'next/image';
import { useSWRConfig } from 'swr';

import { Game } from '../..';
import { api } from '../services/axios';

export type GamePictureProps = {
  game: Game;
};
const GamePicure = ({ game }: GamePictureProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<'loading' | 'not_loading'>('not_loading');
  const [file, setFile] = useState<FileList | null>(null);
  const { mutate } = useSWRConfig();

  const handleUpload = async () => {
    try {
      if (file) {
        setIsLoading('loading');
        const formData = new FormData();
        formData.append('game_picture', file[0]);

        const { data } = await api.put(`/games/picture/${game.id}`, formData);
        await mutate(`/games/${game.id}`);
        toast.success(data);

        setIsLoading('not_loading');
      }
      throw new Error('Voce precisa enviar uma foto');
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
            width={320}
            height={30}
            quality={100}
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </>
      ) : (
        <>
          <button className="btn btn-sm btn-outline" onClick={() => setIsOpen((prev) => !prev)}>
            Carregar foto do jogo
          </button>
        </>
      )}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-3" className="modal-toggle" checked={isOpen} />
      <div className="modal">
        <div className="modal-box relative">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </button>
          <h3 className="text-lg font-bold">Carregar foto do jogo</h3>
          <div className="flex flex-col gap-2">
            <input
              type="file"
              className="file-input file-input-bordered file-input-sm w-full max-w-xs my-4"
              onChange={(e) => setFile(e.target.files)}
            />
            <button className={`btn w-fit ${isLoading}`} onClick={handleUpload}>
              Salvar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export { GamePicure };
