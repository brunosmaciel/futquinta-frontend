import { useCallback } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { PlayerProfile } from '../../..';
import { getTopScorers } from '../../functions/functions';

type PlayerContainerType = {
  players: PlayerProfile[];
};
export const PlayerContainer = ({ players }: PlayerContainerType) => {
  const { push } = useRouter();
  const topScorers = useCallback(() => {
    return getTopScorers(players);
  }, [players]);
  const scorers = topScorers().slice(0, 3);

  function setProfilePicture(
    currentPicture: string | null,
    whiteShirt: string | null,
    greenShirt: string | null,
    slug: string
  ): string {
    if (currentPicture === 'WHITE') {
      return whiteShirt!;
    }
    if (currentPicture === 'GREEN') {
      return greenShirt!;
    }
    return `https://ui-avatars.com/api/?name=${slug.replace('-', '')}?bold=true`;
  }
  return (
    <>
      <div className="flex flex-col items-center md:items-start">
        <h2 className="font-bold text-lg">Artilheiros</h2>

        <div className="flex flex-wrap gap-2 justify-center   my-4">
          {scorers.map((player) => {
            const {
              currentPicture,
              id,
              whiteShirtpicture,
              greenShirtpicture,
              slug,
              name,
              shirtNumber,
            } = player;
            return (
              <div
                key={id}
                className=" bg-[#191D24] w-24 h-32 rounded-lg flex flex-col items-center justify-between"
              >
                <div className="avatar  placeholder mt-2">
                  <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
                    <img
                      src={setProfilePicture(
                        currentPicture,
                        whiteShirtpicture,
                        greenShirtpicture,
                        slug
                      )}
                      className="cursor-pointer"
                      onClick={() => {
                        push(`/jogadores/${slug}`);
                      }}
                    />
                  </div>
                </div>
                <h2 className="m-b-2 cursor-pointer">{name}</h2>
                <div className="w-full h-6 rounded-b-lg bg-[#14191F] flex px-2">
                  <p># {shirtNumber || '00'}</p>
                </div>
              </div>
            );
          })}
        </div>
        <Link className="link" href={`/jogadores`}>
          Ver todos os jogadores
        </Link>
      </div>
    </>
  );
};
