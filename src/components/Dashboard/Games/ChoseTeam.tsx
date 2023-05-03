import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { CheckIcon, PlusIcon, Trash2Icon, BanIcon } from 'lucide-react';

import { PlayerProfile } from '../../../..';
import { ChoseTeamContext, GamePlayersList } from '../../../hooks/useSelectPlayer';
type Inputs = {
  playerFunction: 'OUTFIELDPLAYER' | 'GOALKEEPER';
};
type ChoseTeamProps = {
  player: PlayerProfile;
  team: 'WHITE' | 'GREEN';
};
export const ChoseTeam = ({ player, team }: ChoseTeamProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [wasChosen, setWasChosen] = useState<boolean>(false);
  const { add, remove, players } = useContext(ChoseTeamContext);
  const { getValues, register } = useForm<Inputs>();
  useEffect(() => {
    const alreadyIn = players.some((item) => item.name === player.name);
    if (alreadyIn) {
      setWasChosen(true);
      return;
    }
    setWasChosen(false);
  }, [players]);
  const handleClick = ({ name, id }: PlayerProfile) => {
    const { playerFunction } = getValues();

    const data: GamePlayersList = {
      name,
      id,
      function: playerFunction,
      currentTeam: team,
    };
    add(data);
    setIsSelected(true);
  };
  const handleRemovePlayer = () => {
    remove(player.name, team);
    setIsSelected(false);
  };
  return (
    <div
      key={player.id}
      className={`flex transition-colors mt-2 h-auto items-center justify-start px-2 rounded-md ${
        isSelected ? 'bg-base-300' : ''
      }`}
    >
      <h1>{player.name}</h1>
      <div className="flex items-center flex-1">
        <form className="flex justify-end gap-2 w-full">
          <div className="flex ">
            <input
              type="radio"
              value="GOALKEEPER"
              className="radio"
              defaultChecked={player.function === 'GOALKEEPER' ? true : false}
              {...register('playerFunction')}
            />
            <label htmlFor="">Goleiro</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              value="OUTFIELDPLAYER"
              className="radio"
              defaultChecked={player.function === 'OUTFIELDPLAYER' ? true : false}
              {...register('playerFunction')}
            />
            <label htmlFor="">Linha</label>
          </div>
        </form>
        <button
          className={`btn btn-cicle btn-ghost btn-md ${wasChosen ? 'btn-disabled' : ''}`}
          onClick={() => handleClick(player)}
          disabled={isSelected}
        >
          {isSelected ? <CheckIcon /> : <>{wasChosen ? <BanIcon size={15} /> : <PlusIcon />}</>}

          {}
        </button>
        <button className="btn btn-ghost btn-md" onClick={handleRemovePlayer}>
          <Trash2Icon />
        </button>
      </div>
    </div>
  );
};
