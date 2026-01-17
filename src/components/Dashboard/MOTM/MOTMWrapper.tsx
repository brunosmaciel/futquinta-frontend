import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';

import { GameType } from '../../../..';
import { useButtonLoading } from '../../../hooks/useButtonLoading';
import { api } from '../../../services/axios';
import { EditMOTM } from './EditMOTM';
import { Button } from '../../Button';

export type MOTMWrapperProps = {
  game: GameType;
};

type MOTMInputs = {
  motm: string;
};

export type CreateMOTMType = {
  playerId: number;
  gameId: number;
  team: 'WHITE' | 'GREEN';
  name: string;
};

export const MOTMWrapper = ({ game }: MOTMWrapperProps) => {
  const { register, handleSubmit, reset } = useForm<MOTMInputs>();
  const [editMode, setEditMode] = useState(false);
  const { isButtonLoading, setButtonLoading } = useButtonLoading();

  const players = game.players;

  const onSubmit = async (data: MOTMInputs) => {
    if (data.motm === 'Selecione') {
      alert('É necessário selecionar o craque do jogo');
      return;
    }

    const motmData = JSON.parse(data.motm) as CreateMOTMType;

    setButtonLoading(true);
    try {
      const { data } = await api.post(`/motm/${motmData.gameId}/${motmData.playerId}`, {
        team: motmData.team,
      });
      console.log(data);
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
    <div className="flex  w-full flex-col items-center max-w-175 ">
      {editMode ? (
        <EditMOTM game={game} setEditMode={setEditMode} />
      ) : (
        <form
          className="  scale-in-hor-left  w-full flex items-center gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="">Craque do jogo</h1>

          <div className="w-[50%] bg-base-100  p-2 flex justify-center">
            {game.MOTM.length === 1 ? (
              <span className="text-lg font-semibold">{game.MOTM[0].player.name}</span>
            ) : (
              <select {...register('motm')} className="select select-bordered select-sm w-full">
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

          {game.MOTM.length > 0 ? (
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
