import { useRouter } from 'next/navigation';

import { PlayerProfile } from '../../..';

type PlayerContainerType = {
  player: PlayerProfile;
};
export const PlayerContainer = ({ player }: PlayerContainerType) => {
  const { push } = useRouter();
  // const topScorers = useCallback(() => {
  //   return getTopScorers(players);
  // }, [players]);
  // const scorers = topScorers().slice(0, 3);

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
    <div
      key={player.id}
      className=" bg-[#191D24] w-28 h-34 rounded-lg flex flex-col items-center justify-between"
    >
      <div className="avatar  placeholder mt-2">
        <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
          <img
            src={setProfilePicture(
              player.currentPicture,
              player.whiteShirtpicture,
              player.greenShirtpicture,
              player.slug
            )}
            className="cursor-pointer"
            onClick={() => {
              push(`/jogadores/${player.slug}`);
            }}
          />
        </div>
      </div>
      <h2 className="m-b-2 cursor-pointer text-center">{player.name}</h2>
      <div className="w-full h-6 rounded-b-lg bg-[#14191F] flex px-2 items-center gap-2">
        <div>
          <svg
            className="w-4 h-4 fill-secondary"
            viewBox="0 -7.72 127.24603 127.24603"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlSpace="preserve"
            enableBackground="new 0 0 856 412"
            y="0px"
            x="0px"
          >
            <path d="m32 109c-1.4 0-2.5-1.1-2.5-2.5v-62.6l-7 5.9c-.1.1-.2.1-.2.2-1 .6-2.1 1-3.2 1-2 0-3.8-1-4.9-2.6l-10.7-16.1c-1.8-2.7-1-6.3 1.7-8.1l29.7-20.7c.2-.1.4-.3.7-.3.1 0 2.8-.9 6.6-1h3.1c.7 0 1.4.3 1.8.8.5.5.7 1.2.6 1.9 0 .1 0 .3-.1.4.2 7.5 8.1 14.5 16.5 14.5s16.3-7 16.5-14.5c0-.1 0-.3-.1-.4-.1-.7.2-1.4.6-1.9s1.1-.8 1.8-.8h6.1c2.4 0 4.3 1.1 4.5 1.2.1 0 .1.1.2.1l28.7 20.7c2.6 1.7 3.4 5.4 1.6 8.1l-10.7 15.2c-1 1.6-2.9 2.6-4.9 2.6-1.2 0-2.3-.3-3.2-1-.1 0-.1-.1-0.2-.2l-6.4-5.3-.2 62.9c0 1.4-1.1 2.5-2.5 2.5h-63.9z" />
            <path d="m89.1 5c1.8 0 3.1.9 3.1.9l28.7 20.6c1.6 1 2 3.1.9 4.7l-10.7 15.1c-0.6 1-1.7 1.5-2.8 1.5-.6 0-1.3-.2-1.9-.6l-10.5-8.6-.2 68.2h-63.7v-68l-11.2 9.4c-.6.4-1.2.6-1.9.6-1.1 0-2.2-.5-2.8-1.5l-10.6-16.1c-1-1.6-.6-3.6.9-4.7l29.7-20.7s2.4-.8 5.8-.9h3.1v.2.2c0 9 9.1 17.3 19 17.3s19-8.3 19-17.3v-.2-.2h5.9.2c-.1.1 0 .1 0 .1m0-5s-.1 0 0 0h-.2-5.9c-1.4 0-2.7.6-3.7 1.6-.9 1-1.4 2.4-1.3 3.8v.4c-.3 6.1-7.1 11.9-14 11.9s-13.7-5.8-14-11.9v-.4c.1-1.4-.3-2.8-1.3-3.8-.9-1-2.3-1.6-3.7-1.6h-3.1-.1c-4 .1-6.9 1-7.3 1.1-.5.2-.9.4-1.3.7l-29.5 20.6c-3.8 2.6-4.8 7.7-2.3 11.6l10.7 16.1c1.6 2.3 4.2 3.7 7 3.7 1.6 0 3.2-.5 4.6-1.4.2-.1.3-.2.5-.3l2.9-2.5v57.2c0 2.8 2.2 5 5 5h63.8c2.8 0 5-2.2 5-5l.1-57.7 2.3 1.9c.1.1.3.2.4.3 1.4.9 3 1.4 4.6 1.4 2.8 0 5.4-1.4 6.9-3.7l10.6-15 .1-.1c2.5-3.8 1.5-9-2.3-11.5l-28-20.9c-.1-.1-.2-.1-.3-.2-.3-.2-2.6-1.5-5.6-1.5z" />
          </svg>
        </div>
        <span className="font-bold">{player.shirtNumber || '00'}</span>
      </div>
    </div>
  );
};
