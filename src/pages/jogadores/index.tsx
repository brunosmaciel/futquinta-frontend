import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';

import { PlayerProfile } from '../../..';
import { LoadingSpin } from '../../components/Loading';
import { getProfileImage } from '../../functions/getProfileImage';
const Jogadores = () => {
  const { data: players, isLoading } = useSWR<PlayerProfile[]>('/players');
  if (isLoading) {
    return <LoadingSpin />;
  }
  return (
    <div className="">
      {players?.map((player) => (
        <div
          key={player.id}
          // onClick={() => push(`/jogadores/${player.slug}`)}
          className="flex items-center gap-5 py-2 border-b-[1px] border-neutral-900 w-[90%] mx-auto cursor-pointer"
        >
          <Link
            role={'Foto de perfil do jogador'}
            href={`/jogadores/${player.slug}`}
            className="cursor-pointer"
          >
            <Image
              src={getProfileImage(player)}
              alt="Foto de perfil do jogador"
              width={60}
              height={60}
              className="rounded-full w-12 h-12"
            ></Image>
          </Link>
          <h1>{player.name}</h1>
        </div>
      ))}
    </div>
  );
};

export default Jogadores;
