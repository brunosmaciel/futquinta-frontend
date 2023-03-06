/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { useSWRConfig } from 'swr';

import { Game, PlayerStats } from '../..';
import { api } from '../services/axios';

export type GamePlayerStatsProps = {
  player: PlayerStats;
};
const GamePlayerStats = ({
  player: {
    goals,
    goalsConceded,
    name,
    substituition,
    function: playerFunction,
    gameId,
    id,
    currentTeam,
  },
}: GamePlayerStatsProps) => {
  const { mutate } = useSWRConfig();
  const handleIncrementGoals = async (e: any) => {
    if (playerFunction === 'GOALKEEPER') return;

    try {
      if (e.target.value === '0') {
        await api.put<Game>(`/stats/${gameId}/${id}`, {
          goals: Number(e.target.value),
        });
        await mutate(`/games/${gameId}`);
        return;
      }

      await api.put(`/stats/${gameId}/${id}`, {
        goals: Number(e.target.value) || goals,
      });
      await mutate(`/games/${gameId}`);
    } catch (err) {
      console.log(err);
    }
  };
  const handleIncrementSubstitution = async (e: any) => {
    if (playerFunction === 'GOALKEEPER') return;

    try {
      if (e.target.value === '0') {
        await api.put(`/stats/${gameId}/${id}`, {
          substituition: Number(e.target.value),
        });

        return;
      }
      await api.put(`/stats/${gameId}/${id}`, {
        substituition: Number(e.target.value) || substituition,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="collapse">
      <input type="checkbox" className="peer" />
      <div className="collapse-title bg-base-100 border border-base-300  text-primary-content peer-checked:bg-base-300 peer-checked:text-base-300-content">
        <div className="avatar placeholder flex gap-8 items-center">
          <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
            {currentTeam === 'GREEN' ? (
              <span className="text-xs">G</span>
            ) : (
              <span className="text-xs">B</span>
            )}
          </div>
          <h1 className="text-[16px]">{name}</h1>
        </div>
      </div>

      <div className="collapse-content bg-base-100 text-primary-content peer-checked:bg-base-300 peer-checked:text-base-300-content">
        <div className="stats shadow">
          <div className="stat">
            {playerFunction === 'GOALKEEPER' ? (
              <>
                <div className="stat-title">Gols S.</div>
                <input
                  type="number"
                  className="input text-[36px]"
                  size={20}
                  min={0}
                  placeholder={String(goalsConceded || 0)}
                />
              </>
            ) : (
              <>
                <div className="stat-title">Gols</div>
                <input
                  type="number"
                  className="input text-[36px]"
                  size={20}
                  min={0}
                  placeholder={String(goals)}
                  onChange={handleIncrementGoals}
                />
              </>
            )}
          </div>

          <div className="stat">
            <div className="stat-title">Substituições</div>
            <input
              type="number"
              className="input text-[36px]"
              size={20}
              min={0}
              placeholder={String(substituition)}
              onChange={handleIncrementSubstitution}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { GamePlayerStats };
