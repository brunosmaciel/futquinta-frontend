/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PlayerProfile } from '../..';
type GetProfileImageType = {
  player: PlayerProfile;
  team?: 'WHITE' | 'GREEN';
};
const getProfileImage = ({
  currentPicture,
  greenShirtpicture,
  slug,
  whiteShirtpicture,
}: {
  currentPicture: string;
  whiteShirtpicture: string;
  greenShirtpicture: string;
  slug: string;
}): string => {
  if (currentPicture === 'WHITE') {
    return whiteShirtpicture!;
  }
  if (currentPicture === 'GREEN') {
    return greenShirtpicture!;
  }

  return `https://ui-avatars.com/api/?name=${slug.replace('-', '')}&background=191D24&color=fff`;
};
const getProfileImageOnSelectTeams = ({ player, team }: GetProfileImageType): string => {
  const { whiteShirtpicture, greenShirtpicture, slug } = player;

  if (team === 'WHITE') {
    return whiteShirtpicture!;
  }
  if (team === 'GREEN') {
    return greenShirtpicture!;
  }

  return `https://ui-avatars.com/api/?name=${slug.replace('-', '')}&background=191D24&color=fff`;
};

export { getProfileImage, getProfileImageOnSelectTeams };
