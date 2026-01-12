import { GetTopScorersType, PlayerProfile } from '../..';
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

export function getTopScorers(players: PlayerProfile[]): GetTopScorersType[] {
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
    .sort((a, b) => {
      const mediaA = a.totalGames ? a.goals / a.totalGames : 0;
      const mediaB = b.totalGames ? b.goals / b.totalGames : 0;

      if (mediaB !== mediaA) return mediaB - mediaA;

      return b.totalGames - a.totalGames;
    });

  return topScorerRankingArray;
}

export function getPlayerRecord(victories: number, draws: number, defeats: number) {
  const jogos = victories + draws + defeats;
  const pontosConquistados = victories * 3 + draws;
  const pontosPossiveis = jogos * 3;

  if (pontosPossiveis === 0) return 0;

  return Number((pontosConquistados / pontosPossiveis) * 100).toFixed(1);
}

// Exemplo de uso

export { getGoalsPerGame };
