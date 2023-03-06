import Image from 'next/image';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { PlayerProfile } from '../../../..';
import { GameContainer } from '../../../components/Dashboard/DashboardGameContainer';
const Jogador = () => {
  const { query } = useRouter();
  const { data: player, isLoading } = useSWR<PlayerProfile>(`/players/${query.id}`);

  const getGoalsPerGame = (vic: number, def: number, draw: number, goals: number): string => {
    const totalOfGames = vic + def + draw;
    const goalsPerGame = goals / totalOfGames;
    return goalsPerGame.toFixed(2).replace('.', ',');
  };
  player?.Stats.map((player) => {
    console.log(player);
  });
  if (isLoading) {
    return <h1>carregando</h1>;
  }
  if (player) {
    return (
      <div>
        <div className="mx-2  h-36  flex items-center gap-4">
          <Image
            src={
              player.currentPicture || `https://ui-avatars.com/api/?name=${player.name}?bold=true`
            }
            alt={'Foto de perfil do jogador'}
            width={60}
            height={60}
            className="h-20 w-20 rounded-full"
          />
          <h1 className="text-xl">{player.name}</h1>
        </div>
        <div className="divider divider-vertical"></div>
        <div className="flex items-center gap-8 flex-wrap w-[60%]   md:mx-0 lg:mx-0 mx-auto my-4">
          {player.function === 'GOALKEEPER' ? (
            <div className="h-12 w-12  ">
              <p>Gols S</p>
              <p>{player.goalsConceded}</p>
            </div>
          ) : (
            <div className="h-12 w-12 flex flex-col items-center bg-red-500">
              <p>Gols</p>
              <p>{player.goals}</p>
            </div>
          )}
          <div className="h-12 w-12 flex flex-col items-center">
            <p>Vitorias</p>
            <p>{player.victories}</p>
          </div>
          <div className="h-12 w-12 flex flex-col items-center">
            <p>Derrotas</p>
            <p>{player.defeats}</p>
          </div>
          <div className="h-12 w-12 flex flex-col items-center">
            <p>Empates</p>
            <p>{player.draws}</p>
          </div>
          <div className="h-12 w-12 flex flex-col items-center">
            <p>Gols p/j</p>
            <p>{getGoalsPerGame(player.victories, player.defeats, player.draws, player.goals)}</p>
          </div>
          <div className="h-12 w-12 flex flex-col items-center">
            <p>Pontos</p>
            <p>1</p>
          </div>
          <div className="h-12 w-12 flex flex-col items-center">
            <p>Aprov</p>
            <p>1</p>
          </div>
        </div>
        <div className="divider divider-vertical"></div>
        <div className="w-[80%] flex flex-col gap-4 md:mx-0 lg:mx-0 mx-auto">
          {player.Stats.map((player) => (
            <GameContainer game={player.Game} key={player.Game.id} />
          ))}
        </div>
      </div>
    );
  }
};

export default Jogador;
