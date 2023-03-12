import { PlayerProfile } from './../../index.d';
import { getGamesRecord } from './functions';
export interface GeneralRanking {
  slug: string;
  name: string;
  pointsEarned: number;
  pointsDisputed: number;
  games: number;
  record: number;
}
export function getGeneralRanking(players: PlayerProfile[]) {
  const generalRankingNumbers = players.map(({ slug, name, victories, defeats, draws }) => {
    const totalOfGames = victories + defeats + draws;
    const playerRanking: GeneralRanking = {
      slug,
      name,
      pointsDisputed: totalOfGames * 3,
      pointsEarned: victories * 3 + draws * 1,
      games: totalOfGames,
      record: +getGamesRecord(totalOfGames, victories, draws),
    };

    return playerRanking;
  });
  const playersGeneralRanking = generalRankingNumbers.sort((a, b) => {
    if (a.pointsEarned > b.pointsEarned) {
      if (a.name > b.name) return -2;
      return -1;
    }

    return 1;
  });

  return playersGeneralRanking;
}
