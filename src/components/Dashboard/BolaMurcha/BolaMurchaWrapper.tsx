import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';

import { GameType } from '../../../..';
import { useButtonLoading } from '../../../hooks/useButtonLoading';
import { api } from '../../../services/axios';
import { EditBolaMurcha } from './EditBolaMurcha';
import { Button } from '../../Button';

export type BolaMurchaWrapperProps = {
  game: GameType;
};

type BolaMurchaInputs = {
  bolaMurcha: string;
};

export type CreateBolaMurchaType = {
  playerId: number;
  gameId: number;
  team: 'WHITE' | 'GREEN';
  name: string;
};

export const BolaMurchaWrapper = ({ game }: BolaMurchaWrapperProps) => {
  const { register, handleSubmit, reset } = useForm<BolaMurchaInputs>();
  const [editMode, setEditMode] = useState(false);
  const { isButtonLoading, setButtonLoading } = useButtonLoading();

  const players = game.players;

  const onSubmit = async (data: BolaMurchaInputs) => {
    if (data.bolaMurcha === 'Selecione') {
      alert('É necessário selecionar o Bola Murcha do jogo');
      return;
    }

    const bolaMurchaData = JSON.parse(data.bolaMurcha) as CreateBolaMurchaType;

    setButtonLoading(true);
    try {
      await api.post(`/bola-murcha/${bolaMurchaData.gameId}/${bolaMurchaData.playerId}`);

      await mutate(`/games/${game.id}`);
      reset();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setButtonLoading(false);
      setEditMode(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-center max-w-175">
      {editMode ? (
        <EditBolaMurcha game={game} setEditMode={setEditMode} />
      ) : (
        <form
          className="scale-in-hor-left w-full flex items-center gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1>Bola Murcha</h1>

          <div className="w-[50%] bg-base-100 p-2 flex justify-center">
            {game.BolaMurcha?.length === 1 ? (
              <span className="text-lg font-semibold">{game.BolaMurcha[0].player.name}</span>
            ) : (
              <select
                {...register('bolaMurcha')}
                className="select select-bordered select-sm w-full"
              >
                <option>Selecione</option>
                {players.map((player) => (
                  <option
                    key={player.id}
                    value={JSON.stringify({
                      gameId: player.gameId,
                      playerId: player.playerId,
                      team: player.currentTeam,
                      name: player.name,
                    })}
                  >
                    {player.name} ({player.currentTeam === 'WHITE' ? 'Verde E' : 'Verde L'})
                  </option>
                ))}
              </select>
            )}
          </div>

          {game.BolaMurcha?.length > 0 ? (
            <Button
              isLoading={isButtonLoading}
              className="btn btn-xs btn-outline"
              type="button"
              onClick={() => setEditMode(true)}
            >
              Editar
            </Button>
          ) : (
            <Button isLoading={isButtonLoading} className="btn btn-xs btn-outline" type="submit">
              Salvar
            </Button>
          )}
        </form>
      )}
    </div>
  );
};
