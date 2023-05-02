import { VscEdit } from 'react-icons/vsc';

import { useRouter } from 'next/router';

import { Game } from '../../../..';
import { Modal } from '../../Modal';
export type GameContainerProps = {
  game: Game;
};
const GameContainer = ({ game }: GameContainerProps) => {
  const { push } = useRouter();

  return (
    <div className="mx-2 mt-[0.1rem] flex  w-full justify-between" key={game.id}>
      <div className="flex">
        <div className="flex flex-col items-center w-12">
          <p>{new Date(game.createdAt).toLocaleDateString('pt-BR').slice(0, 5)}</p>
          <p>19:15</p>
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="">
          <div className="flex justify-between w-20">
            <p className="text-white">Verde </p>
            <p className="text-white">{game.greenGoals}</p>
          </div>
          <div className="flex justify-between w-20">
            <p className="text-white">Branco</p>
            <p className="text-white">{game.whiteGoals}</p>
          </div>
        </div>
      </div>
      <div className="flex self-start px-2 gap-2">
        <VscEdit
          className="cursor-pointer"
          size={20}
          onClick={() => push(`/dashboard/jogos/${game.id}`)}
        />
        <Modal game={game}>
          <h1>Deseja realmente excluir o jogo?</h1>
          <div className="flex text-red-500 mt-4 gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-red-500 ">O jogo será excluido permanentemente</p>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export { GameContainer };
