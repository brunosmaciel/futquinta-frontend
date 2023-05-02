import Link from 'next/link';

import { PlayerProfile, Game, GeneralRankingAPIType } from '../../..';
import { GameContainer } from './GameContainer';
import { PlayerContainer } from './PlayerContainer';
import { Ranking } from './Ranking';

type HomeProps = {
  players: PlayerProfile[];
  games: Game[];
  generalRankPlayers: GeneralRankingAPIType[];
};
const HomeComponent = ({ players, games, generalRankPlayers }: HomeProps) => {
  return (
    <main className="container-height mx-2  gap-2">
      <div className="flex flex-col items-center md:items-start gap-6">
        <h2 className="font-bold text-lg">Ultimas partidas</h2>
        <div className="flex flex-wrap justify-center gap-2 ">
          {games.map((game) => (
            <GameContainer key={game.id} game={game} />
          ))}
        </div>
        <div>
          <Link className="link" href={`/jogos`}>
            Ver todos os jogos
          </Link>
        </div>
      </div>
      <div className="divider"></div>
      <div className="flex flex-col items-center md:items-start">
        <h2 className="font-bold text-lg">Principais jogadores</h2>
        <div className="flex flex-wrap gap-2 justify-center my-4">
          {players.map((player) => (
            <PlayerContainer key={player.id} player={player} />
          ))}
        </div>
        <Link className="link" href={`/jogadores`}>
          Ver todos os jogadores
        </Link>
      </div>
      <div className="divider"></div>
      <Ranking players={generalRankPlayers} />
    </main>
  );
};

export { HomeComponent };
