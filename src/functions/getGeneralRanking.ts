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
    }).sort((a, b) => {
  if (b.gamesRecord !== a.gamesRecord)
    return b.gamesRecord - a.gamesRecord;

  if (b.totalGames !== a.totalGames)
    return b.totalGames - a.totalGames;

  return b.victories - a.victories;
});
    
    

  return playersGeneralRanking;
}
