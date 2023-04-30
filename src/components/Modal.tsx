import { useState } from 'react';
import { VscTrash } from 'react-icons/vsc';

import { mutate, useSWRConfig } from 'swr';

import { Game } from '../..';
import { api } from '../services/axios';

type ModalPorps = {
  children: React.ReactNode;
  game: Game;
};

const Modal = ({ children, game }: ModalPorps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<'loading' | 'not_loading'>('not_loading');

  const handleDeleteGame = async () => {
    try {
      setIsLoading('loading');
      await api.delete(`/games/${game.id}`);

      await mutate(`/games?status=${game.status.toLocaleLowerCase()}`);
      setIsLoading('not_loading');
      setIsOpen(false);
    } catch (err) {
      return;
    }
  };
  return (
    <>
      {/* The button to open modal */}
      <label htmlFor={`my-modal-${game.id}`}>
        <VscTrash className="cursor-pointer" size={20} onClick={() => setIsOpen((prev) => !prev)} />
      </label>

      {/* Put this part before </body> tag */}
      <input
        type="checkbox"
        id={`my-modal-${game.id}`}
        className="modal-toggle"
        onChange={() => ''}
        checked={isOpen}
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor={`my-modal-${game.id}`}
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            ✕
          </label>

          {children}
          <div className="modal-action">
            <label
              htmlFor="my-modal"
              className={`btn btn-warning ${isLoading}`}
              onClick={handleDeleteGame}
            >
              Excluir mesmo assim
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export { Modal };
