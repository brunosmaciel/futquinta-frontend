/* eslint-disable @typescript-eslint/no-non-null-assertion */

import type { GetStaticProps } from 'next';

import { Game, PlayerProfile } from '../..';
import { HomeComponent } from '../components/HomePageComponent';
import { api } from '../services/axios';
type HomeProps = {
  players: PlayerProfile[];
  games: Game[];
};
const Home = ({ players, games }: HomeProps) => {
  return <HomeComponent players={players} games={games} />;
};
export const getStaticProps: GetStaticProps = async () => {
  const promises = await Promise.all([
    await api.get('/players').then((res) => res.data),
    await api.get('/games').then((res) => res.data),
  ]);

  return {
    props: {
      players: promises[0],
      games: promises[1],
    },
    revalidate: 60,
  };
};
export default Home;
