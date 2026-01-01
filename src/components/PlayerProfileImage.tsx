import { SetStateAction } from 'react';
import { champions } from '../../public/campeoes';
import { TournamentChampionsBadge } from '../components/tournamentChampionsBadge';
import { Crown } from 'lucide-react';
import coroa from '../../public/crown.svg'


import Image from 'next/image';

import { PlayerProfile } from '../..';
import { profilePicturePlaceholder } from '../utils/profilePicturePlaceholder';
import { cn } from '../utils/cn';

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
        className={` flex flex-col items-center justify-center rounded-full w-38 h-38 ${champions.map(
          (tournarmentPlayer) =>
            tournarmentPlayer.id === player.id ? cn('border-[#ffbf00] border-4') : null
        )}`}
      >
    {player.slug === 'otavio' && <div className="absolute top-16 md:top-2 z-10  rounded-full p-[1px] shadow-md">
      <Image src={coroa} alt='1' className="w-24 h-24 text-white" />
    </div>}
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
      {champions.map((tournamentPlayer) =>
        tournamentPlayer.id === player.id ? (
          <div key={player.id} className="flex flex-col justify-center  flex-grow">
            <TournamentChampionsBadge type={tournamentPlayer.type as string} />
          </div>
        ) : null
      )}
    </>
  );
}
