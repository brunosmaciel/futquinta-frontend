/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PlayerProfile } from '../..';

const getProfileImage = ({
  currentPicture,
  whiteShirtpicture,
  greenShirtpicture,
  slug,
}: PlayerProfile): string => {
  if (currentPicture === 'WHITE') {
    return whiteShirtpicture!;
  }
  if (currentPicture === 'GREEN') {
    return greenShirtpicture!;
  }

  return `https://ui-avatars.com/api/?name=${slug.replace('-', '')}&background=191D24&color=fff`;
};

export { getProfileImage };
