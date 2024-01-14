import { PlayerProfile } from './../../index.d';
import { getPlayerStats } from './getPlayerStats';

export function getGeneralRanking(players: PlayerProfile[]) {
  const playersGeneralRanking = players
    .filter((player) => player.role === 'PERMANENT')
    .map((player) => {
      const stats = getPlayerStats(player);
      const { id, name, slug } = player;
      return {
        id,
        name,
        slug,
        ...stats,
        gamesRecord: stats.gamesRecord || 0.0,
      };
    })
    .sort((a, b) => (a.points > b.points ? -1 : 1))
    .sort((a, b) => {
      if (a.points === b.points && a.gamesRecord > b.gamesRecord) return -1;
      return 1;
    })
    .sort((a, b) => {
      if (a.points === b.points && a.gamesRecord === b.gamesRecord && a.totalGames > b.totalGames)
        return -1;
      return 1;
    })
    .sort((a, b) => {
      if (
        a.points === b.points &&
        a.gamesRecord === b.gamesRecord &&
        a.totalGames === b.totalGames &&
        a.name < b.name
      )
        return -1;
      return 1;
    });

  return playersGeneralRanking;
}
