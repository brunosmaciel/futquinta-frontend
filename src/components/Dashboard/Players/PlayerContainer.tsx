import { PenSquare, TrashIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { PlayerProfile } from '../../../..';
import { getProfileImage } from '../../../functions/getProfileImage';
import { DeletePlayerModal } from './DeletePlayerModal';

type PlayerContainerProps = {
  player: PlayerProfile;
};
export const PlayerContainer = ({ player }: PlayerContainerProps) => {
  return (
    <div
      key={player.id}
      className="flex items-center hover:shadow-2xl hover:w-[93%] rounded-2xl transition-all justify-between gap-5 p-2  w-[90%] mx-auto cursor-pointer "
    >
      <div className="flex items-center gap-4  flex-1 ">
        <Link
          role={'Foto de perfil do jogador'}
          href={`/dashboard/jogadores/${player.slug}`}
          className="cursor-pointer"
        >
          <Image
            src={getProfileImage({ player })}
            alt="Foto de perfil do jogador"
            width={60}
            height={60}
            className="rounded-full w-12 h-12 "
          />
        </Link>
        <h1 className="min-w-20">
          {player.shirtNumber || 0} - {player.name}
        </h1>
      </div>
      <div className="flex gap-2">
        <span className="tooltip" data-tip="Editar">
          <Link href={`/dashboard/jogadores/${player.slug}`}>
            <PenSquare className="cursor-pointer" size={18} />
          </Link>
        </span>
        <span className="tooltip" data-tip="Excluir">
          <DeletePlayerModal player={player}>
            <TrashIcon size={18} className="cursor-pointer" />
          </DeletePlayerModal>
        </span>
      </div>
    </div>
  );
};
