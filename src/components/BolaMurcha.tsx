import { useState } from 'react';
import { useSWRConfig } from 'swr';

import { GameType, PlayerProfile } from '../..';
import { api } from '../services/axios';

export type BolaMurchaContainerProps = {
  players?: PlayerProfile[];
  game: GameType;
};

type BolaMurchaType = {
  playerId: number;
  gameid: number;
  player: {
    name: string;
  };
  name: string;
};

const BolaMurchaCotainer = ({ game }: BolaMurchaContainerProps) => {
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBolaMurcha, setSelectedBolaMurcha] = useState<BolaMurchaType | null>(null);

  const players = game.players;

  const handleSave = async () => {
    if (!selectedBolaMurcha) {
      alert('Selecione o BolaMurcha da partida');
      return;
    }

    setIsLoading(true);
    try {
      await api.post(`/motm/${selectedBolaMurcha.gameid}/${selectedBolaMurcha.playerId}`);

      await mutate(`games/${game.id}`);
      setSelectedBolaMurcha(null);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'Selecione') {
      setSelectedBolaMurcha(null);
      return;
    }

    const value = JSON.parse(e.target.value) as BolaMurchaType;
    setSelectedBolaMurcha(value);
  };

  const currentBolaMurcha = game.BolaMurcha.length === 1 ? game.BolaMurcha[0] : null;

  return (
    <div className="flex w-96 flex-col self-center items-center gap-4">
      <h1 className="font-bold text-xl">bola murcha</h1>

      <div className="w-[90%]  rounded-2xl px-4 py-3 flex justify-center">
        {currentBolaMurcha ? (
          <span className="text-lg font-semibold">{currentBolaMurcha.player.name}</span>
        ) : (
          <select
            className="select select-bordered select-sm w-full"
            defaultValue="Selecione"
            onChange={handleChange}
          >
            <option>Selecione</option>
            {players.map((player) => (
              <option
                key={player.id}
                value={JSON.stringify({
                  gameId: player.gameId,
                  playerId: player.playerId,
                  team: player.currentTeam,
                  name: player.name,
                })}
              >
                {player.name} ({player.currentTeam === 'WHITE' ? 'Branco' : 'Verde'})
              </option>
            ))}
          </select>
        )}
      </div>

      {currentBolaMurcha ? (
        <button className="btn btn-xs btn-outline" onClick={() => mutate(`games/${game.id}`)}>
          Editar
        </button>
      ) : (
        <button
          className={`btn btn-xs btn-outline ${isLoading ? 'loading' : ''}`}
          onClick={handleSave}
          disabled={isLoading}
        >
          Salvar
        </button>
      )}
    </div>
  );
};

export { BolaMurchaCotainer };
