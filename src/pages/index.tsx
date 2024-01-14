import type { GetStaticProps } from 'next';

import { Game, GeneralRankingAPIType, PlayerProfile, RecordRankingType } from '../..';
import { HomeComponent } from '../components/Home/HomePageComponent';
import { api } from '../services/axios';
type HomeProps = {
  recordRanking: RecordRankingType[];
  games: Game[];
  generalRankPlayers: GeneralRankingAPIType[];
};
const Home = ({ recordRanking, games, generalRankPlayers }: HomeProps) => {
  return (
    <HomeComponent
      recordRanking={recordRanking}
      games={games}
      generalRankPlayers={generalRankPlayers}
    />
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const [recordRanking, games, generalRanking] = await Promise.all([
    await api.get<RecordRankingType[]>('/rankings/record').then((res) => res.data),
    await api.get<Game[]>('/games?status=finished').then((res) => res.data),
    await api.get<GeneralRankingAPIType[]>('/rankings/general-ranking').then((res) => res.data),
  ]);
  function shuffleArray(inputArray: PlayerProfile[]) {
    const arraySorted = inputArray.sort(() => Math.random() - 0.5);
    return arraySorted;
  }

  const game = games.slice(0, 1);
  const generalRankPlayers = generalRanking.slice(0, 5);

  return {
    props: {
      recordRanking: recordRanking.slice(0, 5),
      games,
      generalRankPlayers,
    },
    revalidate: 10, //12 horas
  };
};
export default Home;
