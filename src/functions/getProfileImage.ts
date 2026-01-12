/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PlayerProfile } from '../..';
type GetProfileImageType = {
  player: PlayerProfile;
  team?: 'WHITE' | 'GREEN';
};
const getProfileImage = ({ player, team }: GetProfileImageType): string => {
  const { currentPicture, whiteShirtpicture, greenShirtpicture, slug } = player;

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
    return (
      whiteShirtpicture ||
      `https://ui-avatars.com/api/?name=${slug.replace('-', '')}&background=191D24&color=fff`
    );
  }
  if (team === 'GREEN') {
    return (
      greenShirtpicture! ||
      `https://ui-avatars.com/api/?name=${slug.replace('-', '')}&background=191D24&color=fff`
    );
  }

  return `https://ui-avatars.com/api/?name=${slug.replace('-', '')}&background=191D24&color=fff`;
};

export { getProfileImage, getProfileImageOnSelectTeams };
