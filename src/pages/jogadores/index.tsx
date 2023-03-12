import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { PlayerProfile } from '../../..';
import { LoadingSpin } from '../../components/Loading';
import { getProfileImage } from '../../functions/getProfileImage';
const Jogadores = () => {
  const { data: players, isLoading } = useSWR<PlayerProfile[]>('/players');

  const { push } = useRouter();
  if (isLoading) {
    return <LoadingSpin />;
  }
  return (
    <div className="w-[95%] mx-auto">
      <div className="flex flex-col ">
        {players?.map((player) => (
          <div
            key={player.id}
            onClick={() => push(`/jogadores/${player.slug}`)}
            className="flex items-center hover:bg-neutral  transition-all justify-between gap-5 py-2 border-b-[1px] border-neutral-900 w-[90%] mx-auto cursor-pointer"
          >
            <div className="flex items-center gap-4">
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
                  className="rounded-full w-12 h-12 "
                ></Image>
              </Link>
              <h1 className="min-w-20">
                {player.shirtNumber || 0} - {player.name}
              </h1>
            </div>
            <Link
              href={`/jogadores/${player.slug}`}
              className="link text-[12px] self-end justify-end"
            >
              Ver perfil completo
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jogadores;
