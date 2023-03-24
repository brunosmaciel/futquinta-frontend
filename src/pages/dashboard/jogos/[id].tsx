/* eslint-disable no-console */
import { useContext, useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { useRouter } from 'next/router';
import useSWR, { useSWRConfig } from 'swr';

import { Game } from '../../../..';
import { AddPlayerToGameModal } from '../../../components/AddPlayerToGameModal';
import { GamePicure } from '../../../components/GamePicture';
import { GamePlayerStats } from '../../../components/GamePlayerStats';
import { LoadingSpin } from '../../../components/Loading';
import { MOTMContainer } from '../../../components/MOTM';
import { SelectPlayers } from '../../../components/SelectTeams';
import { ScoreboardContext } from '../../../contexts/ScoreboardContext';
import { usePlayers } from '../../../hooks/usePlayers';
import { api } from '../../../services/axios';

export type GamePlayersList = {
  id: number;
  name: string;
  currentTeam: 'WHITE' | 'GREEN';
  function: 'GOALKEEPER' | 'OUTFIELDPLAYER';
  shirtNumber: string;
};

const SingleGame = () => {
  const { query } = useRouter();

  const id = query.id;
  const { data: game, isLoading: isLoadingApi } = useSWR<Game>(`/games/${id}`);
  console.log(game?.winnerTeam);
  const { players } = usePlayers();
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState<'loading' | 'not_loading'>('not_loading');
  const [greenPlayers, setGreenPlayers] = useState<GamePlayersList[]>([]);
  const [whitePlayers, setWhitePlayers] = useState<GamePlayersList[]>([]);
  const { whiteGoals, greenGoals, setGreenGoals, setWhiteGoals } = useContext(ScoreboardContext);
  useEffect(() => {
    if (game) {
      const whiteG = game.players
        .filter((player) => player.currentTeam === 'WHITE')
        .map((player) => player.goals)
        .reduce((acc, current) => acc + current, 0);
      const greenG = game.players
        .filter((player) => player.currentTeam === 'GREEN')
        .map((player) => player.goals)
        .reduce((acc, current) => acc + current, 0);

      setWhiteGoals(whiteG);
      setGreenGoals(greenG);
    }
  }, [game]);

  const whiteTeam = game?.players
    .filter((player) => player.currentTeam === 'WHITE')
    .sort((a, b) => {
      if (a.function === 'GOALKEEPER') return -2;
      if (a.goals > b.goals) return -1;
      return 0;
    });
  const greenTeam = game?.players.filter((player) => player.currentTeam === 'GREEN');

  const handleStartGame = async () => {
    setIsLoading('loading');

    const players = {
      players: [...greenPlayers, ...whitePlayers],
    };

    await api.post(`/stats/${id}`, players);

    await mutate(`/games/${id}`);
    setIsLoading('not_loading');
  };
  const handlePlayerDelection = (id: number, team: 'WHITE' | 'GREEN') => {
    if (team === 'WHITE') {
      const removed = whitePlayers.filter((value) => value.id !== id);
      setWhitePlayers(removed);

      return;
    } else {
      const removed = greenPlayers.filter((value) => value.id !== id);
      setGreenPlayers(removed);

      return;
    }
  };
  const hanleFinalizeGame = async () => {
    function getWinnerTeam(greenGoals: number, whiteGoals: number): 'WHITE' | 'GREEN' | 'DRAW' {
      if (greenGoals > whiteGoals) return 'GREEN';
      if (whiteGoals > greenGoals) return 'WHITE';

      return 'DRAW';
    }
    try {
      setIsLoading('loading');

      await api.put(`/games/${id}`, {
        greenGoals,
        whiteGoals,
      });

      await api.post<Game>(`/games/${id}/finish`, {
        winnerTeam: getWinnerTeam(greenGoals, whiteGoals),
      });
      await mutate(`/games/${id}`);
      setIsLoading('not_loading');
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
      setIsLoading('not_loading');
    }
  };
  if (isLoadingApi) {
    return <LoadingSpin />;
  }
  if (game && players) {
    const handleTeamSelection = (e: any, currentTeam: 'GREEN' | 'WHITE') => {
      if (currentTeam === 'GREEN') {
        const {
          id,
          name,
          function: playerFunction,
          shirtNumber,
        }: GamePlayersList = JSON.parse(e.target.value);
        const alreadyRegisted = greenPlayers.some((pl) => pl.id === id);
        if (alreadyRegisted) return;

        if (greenPlayers.length >= 9) {
          alert('time lotado');
          return;
        }
        const newPlayer: GamePlayersList = {
          id,
          name,
          currentTeam,
          function: playerFunction,
          shirtNumber: String(shirtNumber),
        };
        setGreenPlayers((prevState) => [...prevState, newPlayer]);
      }
      if (currentTeam === 'WHITE') {
        console.log(e.target.value);
        const {
          id,
          name,
          function: playerFunction,
          shirtNumber,
        }: GamePlayersList = JSON.parse(e.target.value);

        const alreadyRegisted = whitePlayers.some((pl) => pl.id === id);
        if (alreadyRegisted) return;

        if (whitePlayers.length >= 9) {
          alert('time lotado');
          return;
        }
        const newPlayer: GamePlayersList = {
          id,
          name,
          currentTeam,
          function: playerFunction,
          shirtNumber,
        };
        setWhitePlayers((prevState) => [...prevState, newPlayer]);
      }
    };

    return (
      <div className="mx-2 flex flex-col  min-h-[577px]">
        {game?.status === 'FINISHED' && (
          <>
            <div className="gap-2  flex flex-col items-center">
              <GamePicure game={game} />
              <p>
                <i>Dia {new Date(game?.createdAt).toLocaleDateString('pt-BR').slice(0, 5)}</i>
              </p>
            </div>
            <div className=" flex items-center justify-center gap-8 my-8">
              <div className="flex flex-col items-center">
                <p>Branco</p>
                <div className="h-14 w-14 rounded-full bg-white"></div>
              </div>
              <div className="flex gap-2 text-3xl ">
                <p>{whiteGoals}</p>
                <span>-</span>
                <p>{greenGoals}</p>
              </div>
              <div className="flex flex-col items-center">
                <p>Verde</p>
                <div className="h-14 w-14  rounded-full bg-green-700"></div>
              </div>
            </div>
            <MOTMContainer players={players} game={game} />
            <div className="lg:w-[768px] lg:self-center mt-10 overflow-x-auto">
              <div className="border border-base-300 bg-base-100 p-4 flex items-center gap-10 text-xl overflow-x-hidden">
                <div className="h-10 w-10 rounded-full bg-white"></div>
                <h1 className="font-bold">Branco</h1>
              </div>

              {whiteTeam?.map((player) => (
                <GamePlayerStats
                  player={player}
                  key={player.id}
                  setGreenGoals={setGreenGoals}
                  setWhiteGoals={setWhiteGoals}
                />
              ))}
              <div className="border border-base-300 bg-base-100 p-4 flex items-center gap-10 text-xl">
                <div className="h-10 w-10 rounded-full bg-green-700"></div>
                <h1 className="font-bold">Verde</h1>
              </div>

              {greenTeam?.map((player) => (
                <GamePlayerStats
                  player={player}
                  key={player.id}
                  setGreenGoals={setGreenGoals}
                  setWhiteGoals={setWhiteGoals}
                />
              ))}
            </div>
          </>
        )}
        {game?.status === 'IN_PROGRESS' && (
          <>
            <div className=" flex items-center justify-center gap-8 my-8">
              <div className="flex flex-col items-center">
                <p>Branco</p>
                <div className="h-14 w-14 rounded-full bg-white"></div>
                <div></div>
              </div>
              <div className="flex gap-2 text-3xl ">
                <p>{whiteGoals}</p>
                <span>-</span>
                <p>{greenGoals}</p>
              </div>
              <div className="flex flex-col items-center">
                <p>Verde</p>
                <div className="h-14 w-14  rounded-full bg-green-700"></div>
              </div>
            </div>
            <div className="lg:w-[768px] lg:self-center mt-10 overflow-x-auto">
              <div className="border border-base-300 bg-base-100 p-4 flex items-center justify-between gap-10 text-xl overflow-x-hidden">
                <div className="flex items-center gap-10">
                  <div className="h-10 w-10 rounded-full bg-white"></div>
                  <h1 className="font-bold">Branco</h1>
                </div>
                <div>
                  <AddPlayerToGameModal currentTeam="WHITE" game={game} players={players}>
                    <label
                      htmlFor="my-modal-white"
                      className="flex items-center justify-center bg-neutral hover:bg-neutral-focus cursor-pointer w-10 h-10 rounded-full text-[25px] text-bold "
                    >
                      +
                    </label>
                  </AddPlayerToGameModal>
                </div>
              </div>
              {whiteTeam?.map((player) => (
                <GamePlayerStats
                  player={player}
                  key={player.id}
                  setGreenGoals={setGreenGoals}
                  setWhiteGoals={setWhiteGoals}
                />
              ))}
              <div className="border border-base-300 bg-base-100 p-4 flex items-center gap-10 justify-between text-xl">
                <div className="flex items-center gap-10">
                  <div className="h-10 w-10 rounded-full bg-green-700"></div>
                  <h1 className="font-bold">Verde</h1>
                </div>
                <div>
                  <AddPlayerToGameModal currentTeam="GREEN" game={game} players={players}>
                    <label
                      htmlFor="my-modal-green"
                      className="flex items-center justify-center bg-neutral hover:bg-neutral-focus cursor-pointer w-10 h-10 rounded-full text-[25px] text-bold "
                    >
                      +
                    </label>
                  </AddPlayerToGameModal>
                </div>
              </div>
              {greenTeam?.map((player) => (
                <GamePlayerStats
                  player={player}
                  key={player.id}
                  setGreenGoals={setGreenGoals}
                  setWhiteGoals={setWhiteGoals}
                />
              ))}
            </div>
          </>
        )}
        {game?.status === 'NOT_STARTED' && (
          <>
            <div className="w-full  flex justify-center">
              <h1>Selecione os jogadores</h1>
            </div>
            <div className="flex w-full mt-4  justify-center">
              <div className=" flex-1">
                {players && (
                  <SelectPlayers
                    team="WHITE"
                    handleTeamSelection={handleTeamSelection}
                    players={players}
                  />
                )}

                {whitePlayers?.map((player) => (
                  <div
                    key={player.id}
                    className=" flex items-center justify-between w-[95%] mx-auto my-2"
                  >
                    <p>
                      {String(player.shirtNumber) ?? '00'} - {player.name}
                    </p>
                    <FaTrash
                      size={12}
                      color="#111318"
                      cursor={'pointer'}
                      onClick={() => handlePlayerDelection(player.id, 'WHITE')}
                    />
                  </div>
                ))}
              </div>
              <div className="divider divider-horizontal"></div>
              <div className=" flex-1">
                <div className=" flex-1">
                  {players && (
                    <SelectPlayers
                      team="GREEN"
                      handleTeamSelection={handleTeamSelection}
                      players={players}
                    />
                  )}

                  {greenPlayers?.map((player) => (
                    <div
                      key={player.id}
                      className=" flex items-center justify-between w-[95%] mx-auto my-2"
                    >
                      <p>
                        {String(player.shirtNumber) ?? '00'} - {player.name}
                      </p>
                      <FaTrash
                        size={12}
                        color="#111318"
                        cursor={'pointer'}
                        onClick={() => handlePlayerDelection(player.id, 'GREEN')}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
        {game?.status === 'NOT_STARTED' && (
          <button className={`btn w-fit ${isLoading} mt-8`} onClick={handleStartGame}>
            Iniciar partida
          </button>
        )}
        {game?.status === 'IN_PROGRESS' && (
          <button
            className={`btn ${isLoading} lg:w-fit lg:self-center`}
            onClick={hanleFinalizeGame}
          >
            Finalizar partida
          </button>
        )}
      </div>
    );
  }
};

export default SingleGame;
