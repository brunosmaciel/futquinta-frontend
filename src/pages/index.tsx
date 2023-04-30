import type { GetStaticProps } from 'next';

import { Game, GeneralRankingAPIType, PlayerProfile } from '../..';
import { HomeComponent } from '../components/Home/HomePageComponent';
import { api } from '../services/axios';
type HomeProps = {
  players: PlayerProfile[];
  games: Game[];
  generalRankPlayers: GeneralRankingAPIType[];
};
const Home = ({ players, games, generalRankPlayers }: HomeProps) => {
  return <HomeComponent players={players} games={games} generalRankPlayers={generalRankPlayers} />;
};
export const getStaticProps: GetStaticProps = async () => {
  const promises = await Promise.all([
    await api.get<PlayerProfile[]>('/players').then((res) => res.data),
    await api.get<Game[]>('/games').then((res) => res.data),
    await api.get<GeneralRankingAPIType[]>('/rankings/general-ranking').then((res) => res.data),
  ]);
  function shuffleArray(inputArray: PlayerProfile[]) {
    const arraySorted = inputArray.sort(() => Math.random() - 0.5);
    return arraySorted;
  }
  const players = shuffleArray(promises[0].filter((player) => player.role === 'PERMANENT')).slice(
    0,
    3
  );
  const games = promises[1].slice(0, 3);
  const generalRankPlayers = promises[2].slice(0, 4);

  return {
    props: {
      players,
      games,
      generalRankPlayers,
    },
    revalidate: 10, //12 horas
  };
};
export default Home;
