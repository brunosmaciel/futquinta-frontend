import { SetStateAction, Dispatch } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { mutate } from 'swr';

import { Game } from '../../../..';
import { useButtonLoading } from '../../../hooks/useButtonLoading';
import { api } from '../../../services/axios';
export type EditMOTMType = {
  playerId: number;
  gameId: number;
  team: 'WHITE' | 'GREEN';
  name: string;
};
type EditMOTMProps = {
  game: Game;
  setEditMode: Dispatch<SetStateAction<boolean>>;
};
type EditMOTMInputs = {
  whiteMOTM: string;
  greenMOTM: string;
};
export const EditMOTM = ({ game, setEditMode }: EditMOTMProps) => {
  const { register, handleSubmit } = useForm<EditMOTMInputs>();
  const whitePlayers = game.players.filter((player) => player.currentTeam == 'WHITE');
  const greenPlayers = game.players.filter((player) => player.currentTeam == 'GREEN');
  const currentWhiteMOTM = game.MOTM.filter((motm) => motm.team === 'WHITE')[0];
  const currentGreenMOTM = game.MOTM.filter((motm) => motm.team === 'GREEN')[0];
  const { setButtonLoading, loadingClass } = useButtonLoading();

  const handleEditMOTM = async (data: EditMOTMInputs) => {
    const newWhiteMOTM: EditMOTMType = JSON.parse(data.whiteMOTM);
    const newGreenMOTM: EditMOTMType = JSON.parse(data.greenMOTM);

    // User doesn`t update any field
    setButtonLoading(true);
    if (
      currentGreenMOTM.player.name === newGreenMOTM.name &&
      currentWhiteMOTM.player.name === newWhiteMOTM.name
    ) {
      setEditMode(false);
      setButtonLoading(false);
      return;
    }
    // User update both fields
    if (
      currentGreenMOTM.player.name !== newGreenMOTM.name &&
      currentWhiteMOTM.player.name !== newWhiteMOTM.name
    ) {
      try {
        await Promise.all([
          await api.post(`/motm/${newWhiteMOTM.gameId}/${newWhiteMOTM.playerId}`, {
            team: newWhiteMOTM.team,
          }),
          await api.post(`/motm/${newGreenMOTM.gameId}/${newGreenMOTM.playerId}`, {
            team: newGreenMOTM.team,
          }),
        ]);
        await Promise.all([
          await api.delete(`/motm/${currentWhiteMOTM.id}`),
          await api.delete(`/motm/${currentGreenMOTM.id}`),
        ]);

        await mutate(`/games/${game.id}`);
        setButtonLoading(false);
        setEditMode(false);
      } catch (err: any) {
        toast.error(err.message);
      }
    }
    // User update white motm field
    if (currentGreenMOTM.player.name === newGreenMOTM.name) {
      try {
        await api.post(`/motm/${newWhiteMOTM.gameId}/${newWhiteMOTM.playerId}`, {
          team: newWhiteMOTM.team,
        });

        await api.delete(`/motm/${currentWhiteMOTM.id}`);

        await mutate(`/games/${game.id}`);
        setEditMode(false);
        setButtonLoading(false);
      } catch (err: any) {
        toast.error(err.message);
      }
    }
    // User ser update green motm field
    if (currentWhiteMOTM.player.name === newWhiteMOTM.name) {
      try {
        await api.post(`/motm/${newGreenMOTM.gameId}/${newGreenMOTM.playerId}`, {
          team: newGreenMOTM.team,
        });

        await api.delete(`/motm/${currentGreenMOTM.id}`);

        await mutate(`/games/${game.id}`);
        setEditMode(false);
        setButtonLoading(false);
      } catch (err: any) {
        toast.error(err.message);
      }
    }
  };
  return (
    <>
      <form
        className="scale-in-hor-left flex w-96 flex-col self-center items-center gap-4 "
        onSubmit={handleSubmit(handleEditMOTM)}
      >
        <h1 className="font-bold text-md">
          <i>Editar</i>
        </h1>
        <div className=" h-22 bg-[#131A21] flex gap-2 rounded-2xl justify-between px-4 py-2 ">
          <select
            className="select min-w-[205px]
    select-bordered select-sm w-30 max-w-xs"
            {...register('whiteMOTM')}
          >
            <option
              value={JSON.stringify({
                name: currentWhiteMOTM.player.name,
                team: currentWhiteMOTM.team,
              })}
            >
              {currentWhiteMOTM.player.name || 'Selecione'}
            </option>
            {whitePlayers?.map((player) => (
              <option
                key={player.id}
                value={JSON.stringify({
                  gameId: player.gameId,
                  playerId: player.playerId,
                  team: player.currentTeam,
                  name: player.name,
                })}
              >
                {player.name}
              </option>
            ))}
          </select>

          <div className="bg-white w-[2px]"></div>

          <select
            {...register('greenMOTM')}
            className="select select-bordered select-sm w-30 max-w-xs"
          >
            <option
              value={JSON.stringify({
                name: currentGreenMOTM.player.name,
              })}
            >
              {currentGreenMOTM.player.name || 'Selecione'}
            </option>
            {greenPlayers?.map((player) => (
              <option
                key={player.id}
                value={JSON.stringify({
                  gameId: player.gameId,
                  playerId: player.playerId,
                  team: player.currentTeam,
                  name: player.name,
                })}
              >
                {player.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button className={`btn btn-xs btn-outline ${loadingClass}`} type="submit">
            Salvar
          </button>
          <button
            className={`btn btn-xs btn-outline`}
            onClick={() => setEditMode(false)}
            type="submit"
          >
            Fechar
          </button>
        </div>
      </form>
    </>
  );
};
