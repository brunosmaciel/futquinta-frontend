'use client';
import { ReactNode, useState } from 'react';

import { format } from 'date-fns-tz';

type CreateGameModalProps = {
  children: ReactNode;
  handleCreateGame: (date: string) => Promise<void>;
  isLoading: 'loading' | 'not_loading';
};

export const CreateGameModal = ({
  children,
  handleCreateGame,
  isLoading,
}: CreateGameModalProps) => {
  const today = format(new Date(), 'yyyy-MM-dd');
  const [gameDate, setGameDate] = useState<string>(today);
  return (
    <>
      <label htmlFor="create-game-modal" className="btn btn-ghost gap-2">
        {children}
      </label>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="create-game-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div className="0 flex items-center justify-between ">
            <h3 className="font-bold text-lg">Nova partida</h3>
            <label htmlFor="create-game-modal" className="btn btn-sm btn-circle  right-2 top-2">
              ✕
            </label>
          </div>
          <div className="flex gap-2">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Data da partida</span>
              </label>
              <input
                type="date"
                placeholder="Ex: 01/01/70"
                className="input input-bordered data-[error=true]:input-error w-fit"
                defaultValue={gameDate}
                onChange={(e) => setGameDate(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-action items-center justify-between">
            <button
              onClick={() => handleCreateGame(gameDate)}
              className={`btn btn-primary justify-items-end ${isLoading}`}
            >
              Criar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
