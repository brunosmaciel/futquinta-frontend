import { useForm } from 'react-hook-form';

import { mutate } from 'swr';

import { GameType, PlayerProfile } from '../..';
import { api } from '../services/axios';

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
  game: GameType;
  players: PlayerProfile[];
};

export type Inputs = {
  player: string;
  playerFunction: 'GOALKEEPER' | 'OUTFIELDPLAYER';
};

const AddPlayerToGameModal = ({ currentTeam, children, game, players }: ModalProps) => {
  const playersOnTheGame = game.players.map((player) => player.name);

  const { register, handleSubmit } = useForm<Inputs>();

  const avaliablePlayers = players.filter((player) => {
    if (!playersOnTheGame.includes(player.name)) return player;

    return;
  });
  const avaliablePermanentPlayers = avaliablePlayers.filter(
    (player) => player.role === 'PERMANENT'
  );
  const avaliableGuestPlayers = avaliablePlayers.filter((player) => player.role === 'GUEST');

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
      alert('tinha toast aqui');
    } catch (err: any) {
      alert('Internal Server Error,tinha toast');
    }
  };
  return (
    <>
      {/* The button to open modal */}
      {children}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id={`my-modal-${currentTeam}`} className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <h3 className="font-bold text-lg">
            Adicionar jogador no time {currentTeam === 'WHITE' ? 'Branco' : 'Preto'}
          </h3>
          <label
            htmlFor={`my-modal-${currentTeam}`}
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
              {avaliablePermanentPlayers.map((player) => {
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
              <optgroup label="Convidados">
                {avaliableGuestPlayers.map((player) => {
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
              </optgroup>
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
              Adicionar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export { AddPlayerToGameModal };
