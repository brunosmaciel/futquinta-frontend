import { PlayerProfile } from '../..';

const getGoalsPerGame = (totalOfGames: number, goals: number): string => {
  const goalsPerGame = goals / totalOfGames;
  return goalsPerGame.toFixed(1).replace('.', ',');
};

export const getGamesRecord = (totalOfGames: number, vic: number, draw: number): string => {
  const playerTotalPoints = vic * 3 + draw * 1;
  const disputedPoints = totalOfGames * 3;

  const record = (playerTotalPoints / disputedPoints) * 100;

  return Math.ceil(record).toFixed(0);
};
const getProfileImage = ({
  currentPicture,
  whiteShirtpicture,
  greenShirtpicture,
  name,
}: PlayerProfile): string => {
  if (currentPicture === 'WHITE') {
    return whiteShirtpicture!;
  }
  if (currentPicture === 'GREEN') {
    return greenShirtpicture!;
  }
  return `https://ui-avatars.com/api/?name=${name}?bold=true`;
};

export { getGoalsPerGame, getProfileImage };
