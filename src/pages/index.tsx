/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Suspense } from 'react';

import type { GetServerSideProps } from 'next';

import { Game, GeneralRankingAPIType, PlayerProfile } from '../..';
import { HomeComponent } from '../components/HomePageComponent';
import { LoadingSpin } from '../components/Loading';
import { api } from '../services/axios';
type HomeProps = {
  players: PlayerProfile[];
  games: Game[];
  generalRank: GeneralRankingAPIType[];
};
const Home = ({ players, games, generalRank }: HomeProps) => {
  return <HomeComponent players={players} games={games} generalRank={generalRank} />;
};
export const getServerSideProps: GetServerSideProps = async () => {
  const promises = await Promise.all([
    await api.get('/players').then((res) => res.data),
    await api.get('/games').then((res) => res.data),
    await api.get('rankings/general-ranking').then((res) => res.data),
  ]);

  return {
    props: {
      players: promises[0],
      games: promises[1],
      generalRank: promises[2],
    },
  };
};
export default Home;
