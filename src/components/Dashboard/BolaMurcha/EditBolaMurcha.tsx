import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';

import { GameType } from '../../../..';
import { useButtonLoading } from '../../../hooks/useButtonLoading';
import { api } from '../../../services/axios';
import { Button } from '../../Button';

export type EditBolaMurchaType = {
  playerId: number;
  bolaMurchaId: number;
  name: string;
};

type EditBolaMurchaProps = {
  game: GameType;
  setEditMode: Dispatch<SetStateAction<boolean>>;
};

type EditBolaMurchaInputs = {
  bolaMurcha: string;
};

export const EditBolaMurcha = ({ game, setEditMode }: EditBolaMurchaProps) => {
  const { register, handleSubmit } = useForm<EditBolaMurchaInputs>();
  const { isButtonLoading, setButtonLoading } = useButtonLoading();

  const currentBolaMurcha = game.BolaMurcha[0];

  const players = game.players;

  const handleEditBolaMurcha = async (data: EditBolaMurchaInputs) => {
    if (!data.bolaMurcha) {
      setEditMode(false);
      return;
    }

    const newBolaMurcha = JSON.parse(data.bolaMurcha) as EditBolaMurchaType;

    try {
      const { data: novoBolaMurcha } = await api.put(
        `/bola-murcha/${game.BolaMurcha[0].id}/${newBolaMurcha.playerId}`,
      );
      // Nenhuma alteração
      console.log(novoBolaMurcha);
      await mutate(`/games/${game.id}`);
      setEditMode(false);
      setButtonLoading(true);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <form
      className="scale-in-hor-left flex w-96 flex-col self-center items-center gap-4"
      onSubmit={handleSubmit(handleEditBolaMurcha)}
    >
      <h1 className="font-bold text-md">
        <i>Editar</i>
      </h1>

      <div className="w-full  rounded-2xl px-4 py-3">
        <select
          {...register('bolaMurcha')}
          className="select select-bordered select-sm w-full"
          defaultValue={JSON.stringify({
            gameId: game.id,
            playerId: currentBolaMurcha.playerId,
            name: currentBolaMurcha.player.name,
          })}
        >
          <option
            value={JSON.stringify({
              gameId: game.id,
              playerId: currentBolaMurcha.playerId,
              name: currentBolaMurcha.player.name,
            })}
          >
            {currentBolaMurcha.player.name}
          </option>

          {players.map((player) => (
            <option
              key={player.id}
              value={JSON.stringify({
                playerId: player.playerId,
                name: player.name,
              })}
            >
              {player.name} ({player.currentTeam === 'WHITE' ? 'Branco' : 'Verde'})
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
