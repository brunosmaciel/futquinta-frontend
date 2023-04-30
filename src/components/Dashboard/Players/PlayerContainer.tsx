import { EditIcon, TrashIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { PlayerProfile } from '../../../..';
import { getProfileImage } from '../../../functions/functions';
import { DeletePlayerModal } from './DeletePlayerModal';

type PlayerContainerProps = {
  player: PlayerProfile;
};
export const PlayerContainer = ({ player }: PlayerContainerProps) => {
  return (
    <div
      key={player.id}
      className="flex items-center hover:bg-neutral transition-all justify-between gap-5 py-2 border-b-[1px] border-neutral-900 w-[90%] mx-auto "
    >
      <div className="flex items-center gap-4  flex-1 ">
        <Link
          role={'Foto de perfil do jogador'}
          href={`/dashboard/jogadores/${player.slug}`}
          className="cursor-pointer"
        >
          <Image
            src={getProfileImage(player)}
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
            <EditIcon className="cursor-pointer" size={18} />
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
