import { PlayerProfile } from '../..';
import { getGamesRecord } from './functions';
import { OutfieldProfileStats } from './getGoalkeeperRank';

export function getPlayerStats(player: PlayerProfile) {
  const { playerPosition, Stats, MOTM, BolaMurcha } = player;

  const initialAcc = {
    goals: 0,
    assists: 0,
    substitutions: 0,
    victories: 0,
    defeats: 0,
    draws: 0,
    totalGames: 0,
    goalsConceded: 0,
    goalKeeperGames: 0,
  };

  const acc = Stats.reduce((acc: any, stat: any) => {
    if (!stat.Game) return acc;

    acc.goals += stat.goals;
    acc.assists += stat.assists;
    acc.substitutions += stat.substituition;
    acc.totalGames++;

    const { winnerTeam, greenGoals, whiteGoals } = stat.Game;

    if (stat.currentTeam === winnerTeam) {
      acc.victories++;
    } else if (winnerTeam === 'DRAW') {
      acc.draws++;
    } else {
      acc.defeats++;
    }

    if (stat.function === 'GOALKEEPER') {
      acc.goalKeeperGames++;

      acc.goalsConceded += stat.currentTeam === 'WHITE' ? greenGoals : whiteGoals;
    }

    return acc;
  }, initialAcc);

  const points = acc.victories * 3 + acc.draws;
  const goalsPerGame = acc.totalGames ? acc.goals / acc.totalGames : 0;
  const gamesRecord = getGamesRecord(acc.totalGames, acc.victories, acc.draws);

  const goalsConcededPerGame =
    acc.goalKeeperGames > 0 ? Number((acc.goalsConceded / acc.goalKeeperGames).toFixed(2)) : 0;

  return {
    goals: acc.goals,
    goalsConceded: playerPosition === 'GOALKEEPER' ? acc.goalsConceded : 0,
    goalsConcededPerGame,
    assists: acc.assists,
    substitutions: acc.substitutions,
    victories: acc.victories,
    defeats: acc.defeats,
    draws: acc.draws,
    goalsPerGame,
    points,
    gamesRecord,
    mvp: MOTM.length,
    totalGames: acc.totalGames,
    bolaMurcha: BolaMurcha?.length || 0,
  };
}
