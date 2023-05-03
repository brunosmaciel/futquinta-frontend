import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useSearchParams } from 'next/navigation';
import useSWR, { mutate } from 'swr';

import { Game, PlayerProfile } from '../../../..';
import { ChoseTeamWrapper } from '../../../components/Dashboard/Games/ChoseTeamWrapper';
import { GameHeader } from '../../../components/Dashboard/Games/GameHeader';
import { GameScore } from '../../../components/Dashboard/Games/GameScore';
import { PlayerInGameContainer } from '../../../components/Dashboard/Games/PlayerInGameContainer';
import { MOTMWrapper } from '../../../components/Dashboard/MOTM/MOTMWrapper';
import { GamePicure } from '../../../components/GamePicture';
import { LoadingSpin } from '../../../components/Loading';
import { useButtonLoading } from '../../../hooks/useButtonLoading';
import { ChoseTeamContext } from '../../../hooks/useSelectPlayer';
import { api } from '../../../services/axios';

export default function GamePage() {
  const { get } = useSearchParams();
  const id = get('id');
  const { loadingClass, setButtonLoading } = useButtonLoading();
  const { players: playersList, reset } = useContext(ChoseTeamContext);
  const { data: game, isLoading } = useSWR<Game>(`/games/${id}`);
  const { data } = useSWR<PlayerProfile[]>('/players');

  useEffect(() => {
    reset();
  }, []);
  if (isLoading) return <LoadingSpin />;
  const handleStartGame = async (newGameDate?: Date) => {
    const currentGameDate = new Date(game?.gameDate || '').toLocaleDateString();

    setButtonLoading(true);
    try {
      await api.post(`/stats/${id}`, {
        players: [...playersList],
      });
      api.put(`/games/${game?.id}`, {
        gameDate: newGameDate
          ? currentGameDate !== newGameDate?.toLocaleDateString()
            ? newGameDate.toISOString()
            : game?.gameDate
          : game?.gameDate,
      });

      await mutate(`/games/${id}`);
      setButtonLoading(false);
    } catch (err: any) {
      toast.error('Internal Server Error');
      setButtonLoading(false);
    }
  };
  const hanleFinalizeGame = async ({ greenGoals, whiteGoals }: Game) => {
    function getWinnerTeam(greenGoals: number, whiteGoals: number): 'WHITE' | 'GREEN' | 'DRAW' {
      if (greenGoals > whiteGoals) return 'GREEN';
      if (whiteGoals > greenGoals) return 'WHITE';

      return 'DRAW';
    }
    setButtonLoading(true);
    try {
      await api.put(`/games/${id}`, {
        greenGoals,
        whiteGoals,
      });

      await api.post<Game>(`/games/${id}/finish`, {
        winnerTeam: getWinnerTeam(greenGoals, whiteGoals),
      });
      await api(process.env.REBUILD_PLAYER_PROFILE_HOOK || '');
      await mutate(`/games/${id}`);

      setButtonLoading(false);
    } catch (err: any) {
      toast.error(err.message);
      setButtonLoading(false);
    }
  };
  return (
    <>
      {game?.status === 'NOT_STARTED' ? (
        <ChoseTeamWrapper
          handleStartGame={handleStartGame}
          players={data || []}
          currentGameDate={new Date(game.gameDate)}
        />
      ) : (
        <>
          {game && (
            <div className="flex flex-col items-start md:items-center h-full ">
              {game.status === 'FINISHED' && <GamePicure game={game} />}
              <div className="flex flex-col items-center  w-full">
                <GameScore game={game} />

                {game.status === 'IN_PROGRESS' && (
                  <button
                    className={`btn btn-primary ${loadingClass}`}
                    onClick={() => hanleFinalizeGame(game)}
                  >
                    Finalizar
                  </button>
                )}

                {game.status === 'FINISHED' && <MOTMWrapper game={game} />}
              </div>
              <div className="w-full h-full  gap-2 sm:gap-0 flex flex-wrap">
                <div className="flex-1 p-2 ">
                  <GameHeader game={game} team="WHITE" players={data || []} />
                  {game.players
                    .filter((player) => player.currentTeam === 'WHITE')
                    .sort((a, b) => (a.goals > b.goals ? -1 : 1))
                    .sort((a) => (a.function === 'GOALKEEPER' ? -1 : 1))
                    .map((player) => {
                      return <PlayerInGameContainer key={player.id} playerStats={player} />;
                    })}
                </div>

                <div className=" flex-1 h-full p-2">
                  <GameHeader game={game} team="GREEN" players={data || []} />
                  {game.players
                    .filter((player) => player.currentTeam === 'GREEN')
                    .sort((a, b) => (a.goals > b.goals ? -1 : 1))
                    .sort((a) => (a.function === 'GOALKEEPER' ? -1 : 1))
                    .map((player) => {
                      return <PlayerInGameContainer key={player.id} playerStats={player} />;
                    })}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
