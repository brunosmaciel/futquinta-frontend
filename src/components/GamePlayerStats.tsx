/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { SetStateAction, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useSWRConfig } from 'swr';

import { Game, PlayerStats } from '../..';
import { ScoreboardContext } from '../contexts/ScoreboardContext';
import { api } from '../services/axios';

export type GamePlayerStatsProps = {
  player: PlayerStats;
  setWhiteGoals: React.Dispatch<SetStateAction<number>>;
  setGreenGoals: React.Dispatch<SetStateAction<number>>;
};
const GamePlayerStats = ({
  player: { goals, name, function: playerFunction, gameId, id, currentTeam, player },
}: GamePlayerStatsProps) => {
  const { mutate } = useSWRConfig();
  const { whiteGoals, greenGoals } = useContext(ScoreboardContext);
  useEffect(() => {
    console.log('component mounted on goals change');
  }, []);
  const handleIncrementGoals = async (e: any) => {
    console.log(e.target.value);
    if (e.target.value === '') return;

    try {
      if (e.target.value === '0') {
        await api.put<Game>(`/stats/${gameId}/${id}`, {
          goals: Number(e.target.value),
        });

        await mutate(`/games/${gameId}`);
        return;
      }

      const { data } = await api.put(`/stats/${gameId}/${id}`, {
        goals: Number(e.target.value) || goals,
      });
      console.log(data);
      await mutate(`/games/${gameId}`);

      await mutate('/games');
    } catch (err) {
      console.log(err);
    }
  };

  const goalsConceded = currentTeam === 'GREEN' ? whiteGoals : greenGoals;
  const handleRemovePlayer = async () => {
    try {
      await api.delete(`/stats/${id}`);
      mutate(`/games/${gameId}`);
      toast.success(`Jogador ${player.name} removido com sucesso`, { autoClose: 1000 });
    } catch (err: any) {
      toast.error('Algum erro qualquer');
    }
  };
  return (
    <div className="collapse">
      <input type="checkbox" className="peer" />

      <div className="collapse-title bg-base-100 border border-base-300  text-primary-content peer-checked:bg-base-300 peer-checked:text-base-300-content">
        <div className="avatar placeholder flex gap-8 items-center">
          <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
            {currentTeam === 'GREEN' ? (
              <img
                src={
                  player.greenShirtpicture ||
                  `https://ui-avatars.com/api/?name=${player.slug}?bold=true`
                }
                alt="Avatar do jogador"
              />
            ) : (
              <img
                src={
                  player.whiteShirtpicture ||
                  `https://ui-avatars.com/api/?name=${player.slug}?bold=true`
                }
                alt="Avatar do jogador"
              />
            )}
          </div>
          <h1 className="text-[16px]">{name}</h1>
        </div>
      </div>

      <div className="collapse-content bg-base-100 text-primary-content peer-checked:bg-base-300 peer-checked:text-base-300-content flex justify-between">
        <div className="stats shadow">
          <div className="stat">
            <>
              <div className="stat-title">Gols</div>
              <input
                type="number"
                className="input text-[36px]"
                defaultValue={goals}
                size={20}
                min={0}
                onChange={handleIncrementGoals}
              />
            </>
          </div>
        </div>
        <div className="flex items-end justify-end">
          <button className="btn btn-circle btn-outline btn-sm" onClick={handleRemovePlayer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export { GamePlayerStats };
