import { SetStateAction } from 'react';

import Image from 'next/image';

import { PlayerProfile } from '../..';
import { profilePicturePlaceholder } from '../utils/profilePicturePlaceholder';
interface IPlayerProfileImageProps {
  player: PlayerProfile;
  setIsOpen: (value: SetStateAction<boolean>) => void;
}

export function PlayerProfileImage({ player, setIsOpen }: IPlayerProfileImageProps) {
  if (!player.currentPicture) {
    return (
      <img
        className="rounded-full w-32 h-32 border-2"
        src={profilePicturePlaceholder(player.slug)}
        alt=""
      />
    );
  }

  return (
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
  );
}
