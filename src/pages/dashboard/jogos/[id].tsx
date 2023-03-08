/* eslint-disable no-console */
import { useState } from 'react';

import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { ParsedUrlQuery } from 'querystring';
import useSWR, { useSWRConfig } from 'swr';

import { Game } from '../../../..';
import { GameScore } from '../../../components/Dashboard/GameScore';
import { GamePlayerStats } from '../../../components/GamePlayerStats';
import { MOTMContainer } from '../../../components/MOTM';
import { SelectPlayers } from '../../../components/SelectTeams';
import { usePlayers } from '../../../hooks/usePlayers';
import { api } from '../../../services/axios';

export type GamePlayersList = {
  id: number;
  name: string;
  currentTeam: 'WHITE' | 'GREEN';
  function: 'GOALKEEPER' | 'OUTFIELDPLAYER';
};

const SingleGame = () => {
  const { query } = useRouter();

  const id = query.id;
  const { data: game } = useSWR<Game>(`/games/${id}`);
  const { players } = usePlayers();
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState<'loading' | 'not_loading'>('not_loading');
  const [greenPlayers, setGreenPlayers] = useState<GamePlayersList[]>([]);
  const [whitePlayers, setWhitePlayers] = useState<GamePlayersList[]>([]);
  const whiteTeam = game?.players.filter((player) => player.currentTeam === 'WHITE');
  const greenTeam = game?.players.filter((player) => player.currentTeam === 'GREEN');
  const handleTeamSelection = (e: any, currentTeam: 'GREEN' | 'WHITE') => {
    if (currentTeam === 'GREEN') {
      const { id, name, function: playerFunction }: GamePlayersList = JSON.parse(e.target.value);
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
      };
      setGreenPlayers((prevState) => [...prevState, newPlayer]);
    }
    if (currentTeam === 'WHITE') {
      const { id, name, function: playerFunction }: GamePlayersList = JSON.parse(e.target.value);

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
      };
      setWhitePlayers((prevState) => [...prevState, newPlayer]);
    }
  };

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
    try {
      setIsLoading('loading');
      const data = await api.post<Game>(`/games/${id}/finish`);
      await mutate(`/games/${id}`);
      setIsLoading('not_loading');
      console.log(data.data.winnerTeam);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mx-2 flex flex-col  min-h-[577px]">
      {game?.status === 'FINISHED' && (
        <>
          <GameScore key={game.id} game={game} />
          <MOTMContainer players={players} game={game} />
          <div className="lg:w-[768px] lg:self-center mt-10 overflow-x-auto">
            <div className="border border-base-300 bg-base-100 p-4 flex items-center gap-10 text-xl overflow-x-hidden">
              <div className="h-10 w-10 rounded-full bg-white"></div>
              <h1 className="font-bold">Branco</h1>
            </div>
            {whiteTeam?.map((player) => (
              <GamePlayerStats player={player} key={player.id} />
            ))}
            <div className="border border-base-300 bg-base-100 p-4 flex items-center gap-10 text-xl">
              <div className="h-10 w-10 rounded-full bg-green-700"></div>
              <h1 className="font-bold">Verde</h1>
            </div>
            {greenTeam?.map((player) => (
              <GamePlayerStats player={player} key={player.id} />
            ))}
          </div>
        </>
      )}
      {game?.status === 'IN_PROGRESS' && (
        <>
          <GameScore key={game.id} game={game} />
          <div className="lg:w-[768px] lg:self-center mt-10 overflow-x-auto">
            <div className="border border-base-300 bg-base-100 p-4 flex items-center gap-10 text-xl overflow-x-hidden">
              <div className="h-10 w-10 rounded-full bg-white"></div>
              <h1 className="font-bold">Branco</h1>
            </div>
            {whiteTeam?.map((player) => (
              <GamePlayerStats player={player} key={player.id} />
            ))}
            <div className="border border-base-300 bg-base-100 p-4 flex items-center gap-10 text-xl">
              <div className="h-10 w-10 rounded-full bg-green-700"></div>
              <h1 className="font-bold">Verde</h1>
            </div>
            {greenTeam?.map((player) => (
              <GamePlayerStats player={player} key={player.id} />
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
              {whitePlayers?.map((player, i) => (
                <p key={player.id} onClick={() => handlePlayerDelection(player.id, 'WHITE')}>
                  {i + 1} - {player.name}
                </p>
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

                {greenPlayers?.map((player, i) => (
                  <p key={player.id} onClick={() => handlePlayerDelection(player.id, 'GREEN')}>
                    {i + 1} - {player.name}
                  </p>
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
        <button className={`btn ${isLoading} lg:w-fit lg:self-center`} onClick={hanleFinalizeGame}>
          Finalizar partida
        </button>
      )}
    </div>
  );
};

export default SingleGame;
