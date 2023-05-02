import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { mutate } from 'swr';

import { Game } from '../../../..';
import { useButtonLoading } from '../../../hooks/useButtonLoading';
import { api } from '../../../services/axios';
import { EditMOTM } from './EditMOTM';

export type MOTMWrapperProps = {
  game: Game;
};
type MOTMInputs = {
  whiteMOTM: string;
  greenMOTM: string;
};
export type CreateMOTMType = {
  playerId: number;
  gameId: number;
  team: 'WHITE' | 'GREEN';
  name: string;
};
export const MOTMWrapper = ({ game }: MOTMWrapperProps) => {
  const { register, handleSubmit } = useForm<MOTMInputs>();
  const [editMode, setEditMode] = useState<boolean>(false);
  const whitePlayers = game.players.filter((player) => player.currentTeam == 'WHITE');
  const greenPlayers = game.players.filter((player) => player.currentTeam == 'GREEN');
  const { loadingClass, setButtonLoading } = useButtonLoading();
  const onSubmit = async (data: MOTMInputs) => {
    if (data.greenMOTM === 'Selecione' || data.greenMOTM === 'Selecione') {
      toast.warn('É necessário selecionar o craque do jogo das duas equipes');
      return;
    }
    const whiteMOTMData = JSON.parse(data.whiteMOTM) as CreateMOTMType;
    const greenMOTMData = JSON.parse(data.greenMOTM) as CreateMOTMType;
    setButtonLoading(true);
    try {
      await Promise.all([
        await api.post(`/motm/${whiteMOTMData.gameId}/${whiteMOTMData.playerId}`, {
          team: whiteMOTMData.team,
        }),
        await api.post(`/motm/${greenMOTMData.gameId}/${greenMOTMData.playerId}`, {
          team: greenMOTMData.team,
        }),
      ]);
      await mutate(`/games/${game.id}`);
      setButtonLoading(false);
    } catch (err: any) {
      toast.error(err.message);
      setButtonLoading(false);
    }
  };

  return (
    <div className="">
      {editMode === true ? (
        <>
          <EditMOTM game={game} setEditMode={setEditMode} />
        </>
      ) : (
        <>
          <form
            className=" scale-in-hor-left  flex w-96 flex-col self-center items-center gap-4 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="font-bold text-xl">Craque do jogo</h1>
            <div className=" h-22 bg-[#131A21] flex gap-2 rounded-2xl justify-between px-4 py-2 ">
              {game.MOTM.length === 2 ? (
                <h1 className="min-w-[205px]">
                  {game.MOTM.filter((motm) => motm.team === 'WHITE')[0].player.name}
                </h1>
              ) : (
                <>
                  <select
                    {...register('whiteMOTM')}
                    className="select min-w-[205px]
            select-bordered select-sm w-30 max-w-xs"
                  >
                    <option>{'Selecione'}</option>
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
                </>
              )}
              <div className="bg-white w-[2px]"></div>
              {game.MOTM.length === 2 ? (
                <>
                  <h1 className="min-w-[205px]">
                    {game.MOTM.filter((motm) => motm.team === 'GREEN')[0].player.name}
                  </h1>
                </>
              ) : (
                <select
                  {...register('greenMOTM')}
                  className="select select-bordered select-sm w-30 max-w-xs"
                >
                  <option>{'Selecione'}</option>
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
              )}
            </div>
            {game.MOTM.length === 2 ? (
              <>
                <button
                  className={`btn btn-xs btn-outline ${loadingClass}`}
                  type="submit"
                  onClick={() => setEditMode(true)}
                >
                  Editar
                </button>
              </>
            ) : (
              <>
                <button className={`btn btn-xs btn-outline ${loadingClass}`} type="submit">
                  Salvar{' '}
                </button>
              </>
            )}
          </form>
        </>
      )}
    </div>
  );
};
