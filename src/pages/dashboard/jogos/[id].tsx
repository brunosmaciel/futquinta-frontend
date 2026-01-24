import { useContext, useEffect } from 'react';

import useSWR, { mutate } from 'swr';

import { GameType, PlayerProfile } from '../../../..';
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
import { Button } from '../../../components/Button';
import { BolaMurchaCotainer } from '../../../components/BolaMurcha';
import { BolaMurchaWrapper } from '../../../components/Dashboard/BolaMurcha/BolaMurchaWrapper';

interface IGamePageProps {
  id: number;
}
export default function GamePage({ id }: IGamePageProps) {
  const { setButtonLoading, isButtonLoading } = useButtonLoading();
  const { players: playersList, reset } = useContext(ChoseTeamContext);
  const { data: game, isLoading } = useSWR<GameType>(`/games/${id}`);
  const { data } = useSWR<PlayerProfile[]>('/players');
  console.log(game?.BolaMurcha);

  useEffect(() => {
    reset();
  }, []);
  if (isLoading) return <LoadingSpin />;
  const handleStartGame = async () => {
    setButtonLoading(true);

    try {
      await api.post(`/stats/${id}`, {
        players: [...playersList],
      });
      await mutate(`/games/${id}`);
      setButtonLoading(false);
    } catch (err: any) {
      setButtonLoading(false);
    }
  };
  const hanleFinalizeGame = async ({ greenGoals, whiteGoals }: GameType) => {
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

      await api.post<GameType>(`/games/${id}/finish`, {
        winnerTeam: getWinnerTeam(greenGoals, whiteGoals),
      });

      process.env.NODE_ENV === 'production' &&
        (await api(process.env.REBUILD_PLAYER_PROFILE_HOOK || ''));
      await mutate(`/games/${id}`);

      setButtonLoading(false);
    } catch (err: any) {
      setButtonLoading(false);
    }
  };
  return (
    <>
      {game?.status === 'NOT_STARTED' ? (
        <>
          <ChoseTeamWrapper
            isLoading={isButtonLoading}
            handleStartGame={handleStartGame}
            players={data || []}
            currentGameDate={game.gameDate}
          />
        </>
      ) : (
        <>
          {game && (
            <div className="flex flex-col items-start md:items-center h-full ">
              {game.status === 'FINISHED' && <GamePicure game={game} />}

              <div className="flex flex-col items-center  w-full">
                <GameScore game={game} />

                {game.status === 'IN_PROGRESS' && (
                  <Button
                    isLoading={isButtonLoading}
                    className={`btn btn-primary`}
                    onClick={() => hanleFinalizeGame(game)}
                  >
                    Finalizar
                  </Button>
                )}

                {game.status === 'FINISHED' && (
                  <div>
                    {game.greenGoals === game.whiteGoals ? (
                      <>
                        <MOTMWrapper game={game} />
                      </>
                    ) : (
                      <>
                        <MOTMWrapper game={game} />
                        <BolaMurchaWrapper game={game} />
                      </>
                    )}
                  </div>
                )}
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

export const getServerSideProps = (ctx: any) => {
  return {
    props: {
      id: ctx.params.id,
    },
  };
};
