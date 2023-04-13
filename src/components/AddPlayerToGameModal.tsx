import { useState } from 'react';
import { useForm } from 'react-hook-form';
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

export type Inputs = {
  player: string;
  playerFunction: 'GOALKEEPER' | 'OUTFIELDPLAYER';
};

const AddPlayerToGameModal = ({ currentTeam, children, game, players }: ModalProps) => {
  const playersOnTheGame = game.players.map((player) => player.name);
  const [newPlayer, setNewPlayer] = useState<GamePlayersList>({} as GamePlayersList);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const avaliablePlayers = players.filter((player) => {
    return !playersOnTheGame.includes(player.name);
  });

  const onSubmit = async ({ player, playerFunction }: Inputs) => {
    const { id, name }: GamePlayersList = JSON.parse(player);
    const data = {
      name,
      currentTeam,
      function: playerFunction,
    };

    try {
      await api.post(`/stats/${game.id}/${id}`, data);

      await mutate(`/games/${game.id}`);
      toast.success(
        `Jogador ${name} adicionado ao  time ${currentTeam === 'WHITE' ? 'Branco' : 'Verde'}`
      );
    } catch (err: any) {
      console.log(err);
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
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <select
              {...register('player')}
              className="select select-bordered select-sm w-full max-w-xs"
            >
              <option key={99999}>Selecione</option>
              {avaliablePlayers.map((player) => {
                return (
                  <option
                    key={player.id}
                    value={JSON.stringify({
                      id: player.id,
                      name: player.name,
                      shirtNumber: String(player.shirtNumber || '00'),
                    })}
                  >
                    {player.name}
                  </option>
                );
              })}
            </select>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  className="radio radio-accent"
                  value={'GOALKEEPER'}
                  {...register('playerFunction')}
                />
                <p className="text-sm">Goleiro</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  className="radio radio-accent"
                  value={'OUTFIELDPLAYER'}
                  {...register('playerFunction')}
                  defaultChecked
                />
                <p className="text-sm">Jogador de linha</p>
              </div>
            </div>
            <button className="btn btn-accent w-fit" type="submit">
              Salvar
            </button>

            <div className="modal-action">
              <label
                htmlFor={`my-modal-${currentTeam.toLocaleLowerCase()}`}
                className="btn btn-neutral"
              >
                Fechar
              </label>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export { AddPlayerToGameModal };
