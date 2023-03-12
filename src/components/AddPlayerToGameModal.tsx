import { useState } from 'react';
import { toast } from 'react-toastify';

import { mutate } from 'swr';

import { Game, PlayerProfile } from '../..';
import { api } from '../services/axios';
import { SelectPlayers } from './SelectTeams';

export type GamePlayersList = {
  id: number;
  name: string;
  currentTeam: 'WHITE' | 'GREEN';
  function: 'GOALKEEPER' | 'OUTFIELDPLAYER';
  shirtNumber?: string;
};

export type ModalProps = {
  currentTeam: 'WHITE' | 'GREEN';
  children: React.ReactNode;
  game: Game;
  players: PlayerProfile[];
};

const AddPlayerToGameModal = ({ currentTeam, children, game, players }: ModalProps) => {
  const playersOnTheGame = game.players.map((player) => player.name);
  const [newPlayer, setNewPlayer] = useState<GamePlayersList>({} as GamePlayersList);

  const avaliablePlayers = players.filter((player) => {
    return !playersOnTheGame.includes(player.name);
  });
  const handleAddPlayerToGame = async (e: any) => {
    const { id, name, function: playerFunction }: GamePlayersList = JSON.parse(e.target.value);
    setNewPlayer({
      id,
      name,
      function: playerFunction,
      currentTeam,
    });
  };
  const handleSave = async () => {
    const { name, currentTeam, function: playerFunction } = newPlayer;
    try {
      await api.post(`/stats/${game.id}/${newPlayer.id}`, {
        name,
        currentTeam,
        function: playerFunction,
      });

      await mutate(`/games/${game.id}`);
    } catch (err: any) {
      toast.error('algum erro aconteceu');
    }
  };
  return (
    <>
      {/* The button to open modal */}
      {children}

      {/* Put this part before </body> tag */}
      <input
        type="checkbox"
        id={`my-modal-${currentTeam.toLocaleLowerCase()}`}
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <h3 className="font-bold text-lg">
            Adicionar jogador no time {currentTeam === 'WHITE' ? 'Branco' : 'Verde'}
          </h3>
          <label
            htmlFor={`my-modal-${currentTeam.toLocaleLowerCase()}`}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <p className="py-4">Selecione</p>
          <select
            className="select select-bordered select-sm w-full max-w-xs"
            onChange={handleAddPlayerToGame}
            value={newPlayer.name || 'Selecione'}
          >
            <option defaultValue={newPlayer.name || 'Selecione'}>
              {newPlayer.name || 'Selecione'}
            </option>
            {avaliablePlayers.map((player) => (
              <option
                key={player.id}
                value={JSON.stringify({
                  id: player.id,
                  function: player.function,
                  name: player.name,
                  shirtNumber: String(player.shirtNumber || '00'),
                })}
              >
                {player.name}
              </option>
            ))}
          </select>
          <div className="modal-action">
            <label
              htmlFor={`my-modal-${currentTeam.toLocaleLowerCase()}`}
              className="btn"
              onClick={handleSave}
            >
              Adicionar
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export { AddPlayerToGameModal };
