import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';

import { GameType } from '../../../..';
import { useButtonLoading } from '../../../hooks/useButtonLoading';
import { api } from '../../../services/axios';
import { Button } from '../../Button';

export type EditMOTMType = {
  playerId: number;
  gameId: number;
  team: 'WHITE' | 'GREEN';
  name: string;
};

type EditMOTMProps = {
  game: GameType;
  setEditMode: Dispatch<SetStateAction<boolean>>;
};

type EditMOTMInputs = {
  motm: string;
};

export const EditMOTM = ({ game, setEditMode }: EditMOTMProps) => {
  const { register, handleSubmit } = useForm<EditMOTMInputs>();
  const { isButtonLoading, setButtonLoading } = useButtonLoading();

  const currentMOTM = game.MOTM[0];
  const players = game.players;

  const handleEditMOTM = async (data: EditMOTMInputs) => {
    if (!data.motm) {
      setEditMode(false);
      return;
    }

    const newMOTM = JSON.parse(data.motm) as EditMOTMType;

    // Nenhuma alteração
    if (newMOTM.playerId === currentMOTM.player.id) {
      setEditMode(false);
      return;
    }

    setButtonLoading(true);
    try {
      // Cria novo MOTM
      await api.post(`/motm/${newMOTM.gameId}/${newMOTM.playerId}`, {
        team: newMOTM.team,
      });

      // Remove MOTM antigo
      await api.delete(`/motm/${currentMOTM.id}`);

      await mutate(`/games/${game.id}`);
      setEditMode(false);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <form
      className="scale-in-hor-left flex w-96 flex-col self-center items-center gap-4"
      onSubmit={handleSubmit(handleEditMOTM)}
    >
      <h1 className="font-bold text-md">
        <i>Editar</i>
      </h1>

      <div className="w-full bg-[#131A21] rounded-2xl px-4 py-3">
        <select
          {...register('motm')}
          className="select select-bordered select-sm w-full"
          defaultValue={JSON.stringify({
            gameId: game.id,
            playerId: currentMOTM.playerProfileId,
            team: currentMOTM.team,
            name: currentMOTM.player.name,
          })}
        >
          <option
            value={JSON.stringify({
              gameId: game.id,
              playerId: currentMOTM.playerProfileId,
              team: currentMOTM.team,
              name: currentMOTM.player.name,
            })}
          >
            {currentMOTM.player.name}
          </option>

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
      </div>

      <div className="flex gap-2">
        <Button isLoading={isButtonLoading} className="btn btn-xs btn-outline" type="submit">
          Salvar
        </Button>

        <Button className="btn btn-xs btn-outline" type="button" onClick={() => setEditMode(false)}>
          Fechar
        </Button>
      </div>
    </form>
  );
};
