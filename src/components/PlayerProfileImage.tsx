import { SetStateAction } from 'react';
import { champions } from '../../public/campeoes';

import Image from 'next/image';

import { PlayerProfile } from '../..';
import { profilePicturePlaceholder } from '../utils/profilePicturePlaceholder';
import { cn } from '../utils/cn';
import { Crown } from 'lucide-react';
interface IPlayerProfileImageProps {
  player: PlayerProfile;
  setIsOpen: (value: SetStateAction<boolean>) => void;
}

export function PlayerProfileImage({ player, setIsOpen }: IPlayerProfileImageProps) {
  if (!player.currentPicture) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className="rounded-full w-32 h-32 border-2"
        src={profilePicturePlaceholder(player.slug)}
        alt=""
      />
    );
  }

  return (
    <>
      <div
        className={` flex flex-col items-center justify-center rounded-full w-38 h-38 ${
          champions.includes(player.id) ? cn('border-[#ffbf00] border-4') : null
        }`}
      >
        <Image
          src={
            player.currentPicture === 'WHITE'
              ? player.whiteShirtpicture || ''
              : player.greenShirtpicture || ''
          }
          alt="Foto de perfil do jogador"
          width={300}
          height={300}
          className="rounded-full w-36 h-36 border-2"
          onClick={() => setIsOpen(true)}
        />
      </div>
      {champions.includes(player.id) ? (
        <>
          <h1 className="badge bg-[#ffbf00] text-black p-[12px] text-sm font-bold">
            <Crown className="mr-2" /> Campeão Torneio Interno 2024
          </h1>
        </>
      ) : null}
    </>
  );
}
