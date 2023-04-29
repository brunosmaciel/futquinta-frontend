import { PlayerProfile, Game, GeneralRankingAPIType } from '../../..';
import { GameContainer } from './GameContainer';
import { PlayerContainer } from './PlayerContainer';
import { Ranking } from './Ranking';

type HomeProps = {
  players: PlayerProfile[];
  games: Game[];
  generalRank: GeneralRankingAPIType[];
};
const HomeComponent = ({ players, games, generalRank }: HomeProps) => {
  return (
    <div className="container-height mx-2  gap-2 ">
      <div className="flex flex-col items-center md:items-start gap-6">
        <GameContainer games={games} />
      </div>
      <div className="divider my-3"></div>
      <PlayerContainer players={players} />
      <div className="divider my-3"></div>

      <Ranking rank={generalRank} />
    </div>
  );
};

export { HomeComponent };
