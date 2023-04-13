import { PlayerProfile } from '../..';
import { getPlayerStats } from './getPlayerStats';

const getGoalsPerGame = (totalOfGames: number, goals: number): string => {
  const goalsPerGame = goals / totalOfGames;
  return goalsPerGame.toFixed(1).replace('.', ',');
};

export const getGamesRecord = (totalOfGames: number, vic: number, draw: number): number => {
  const playerTotalPoints = vic * 3 + draw * 1;
  const disputedPoints = totalOfGames * 3;

  const record = (playerTotalPoints / disputedPoints) * 100;

  return +record;
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
export function getTopScorers(players: PlayerProfile[]) {
  const topScorerRankingArray = players
    .filter((player) => player.name !== 'Convidados' && player.role === 'PERMANENT')
    .map((player) => {
      const stats = getPlayerStats(player);
      const { id, name, slug, currentPicture, whiteShirtpicture, greenShirtpicture, shirtNumber } =
        player;

      return {
        id,
        name,
        slug,
        currentPicture,
        whiteShirtpicture,
        greenShirtpicture,
        shirtNumber,
        ...stats,
      };
    })
    .sort((a, b) => (a.goals > b.goals ? -1 : 1))
    .sort((a, b) => {
      if (a.goals === b.goals && a.goalsPerGame > b.goalsPerGame) return -1;
      return 1;
    })
    .sort((a, b) => {
      if (a.goals === b.goals && a.goalsPerGame === b.goalsPerGame && a.name < b.name) return -1;
      return 1;
    });

  return topScorerRankingArray;
}
export { getGoalsPerGame, getProfileImage };
