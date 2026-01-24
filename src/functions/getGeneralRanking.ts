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
    .sort((a, b) => {
      // 1º Maior número de pontos
      if (b.points !== a.points) {
        return b.points - a.points;
      }

      // 2º Maior aproveitamento
      const aproveitamentoA = a.points / (a.totalGames * 3);
      const aproveitamentoB = b.points / (b.totalGames * 3);

      if (aproveitamentoB !== aproveitamentoA) {
        return aproveitamentoB - aproveitamentoA;
      }

      // 3º Maior número de jogos
      if (b.totalGames !== a.totalGames) {
        return b.totalGames - a.totalGames;
      }

      // 4º Maior número de vitórias
      return b.victories - a.victories;
    });

  return playersGeneralRanking;
}
