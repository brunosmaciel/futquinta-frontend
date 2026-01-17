import { SetStateAction } from 'react';
import Image from 'next/image';

import { champions } from '../../public/campeoes';
import { TournamentChampionsBadge } from '../components/tournamentChampionsBadge';
import coroa from '../../public/crown.svg';

import { PlayerProfile } from '../..';
import { profilePicturePlaceholder } from '../utils/profilePicturePlaceholder';
import { cn } from '../utils/cn';

interface IPlayerProfileImageProps {
  player: PlayerProfile;
}

export function PlayerProfileImage({ player }: IPlayerProfileImageProps) {
  const playerChampions = champions.filter((tournamentPlayer) => tournamentPlayer.id === player.id);

  const hasChampion = playerChampions.length > 0;

  if (!player.currentPicture) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={profilePicturePlaceholder(player.slug)}
        alt="Foto de perfil"
        className="w-32 h-32 border-2 "
      />
    );
  }

  const picture =
    player.currentPicture === 'WHITE' ? player.whiteShirtpicture : player.greenShirtpicture;

  if (!picture) return null;

  return (
    <>
      <div className={cn('relative flex items-center justify-center  w-46 h-46')}>
        {player.slug === 'otavio' && (
          <div className="absolute -top-18 z-10">
            <Image src={coroa} alt="Coroa" className="w-24 h-24" />
          </div>
        )}

        <Image
          src={picture}
          alt="Foto de perfil do jogador"
          width={300}
          height={300}
          className="w-full h-full border-2  cursor-pointer "
        />
      </div>

      {hasChampion && (
        <div className="flex flex-col justify-center grow gap-3">
          {playerChampions.map((champion, index) => (
            <TournamentChampionsBadge key={`${champion.type}-${index}`} type={champion.type} />
          ))}
        </div>
      )}
    </>
  );
}
