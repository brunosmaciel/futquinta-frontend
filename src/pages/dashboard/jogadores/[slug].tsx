import { GetStaticProps } from 'next';

import { PlayerProfile } from '../../../..';
import { api } from '../../../services/axios';
export type JogadorProps = {
  player: PlayerProfile;
};
const Jogador = ({ player }: JogadorProps) => {
  return <h1>{player.name}</h1>;
};
export const getStaticProps: GetStaticProps = async (context) => {
  const { data: player } = await api.get<PlayerProfile>(`/players/${context?.params?.slug}`);

  return {
    props: {
      player,
    },
    revalidate: 5,
  };
};
export async function getStaticPaths() {
  const { data: players } = await api.get<PlayerProfile[]>('/players');

  return {
    paths: players.map((player) => {
      return {
        params: {
          slug: player.slug,
        },
      };
    }),
    fallback: false,
  };
}

export default Jogador;
