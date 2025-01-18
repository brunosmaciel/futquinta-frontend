import { PlayerProfile } from '../..';
import { getGamesRecord } from './functions';

export interface OutfieldProfileStats {
  goals: number;
  goalsConceded: number;
  assists: number;
  substitutions: number;
  victories: number;
  defeats: number;
  draws: number;
  goalsPerGame: number;
  points: number;
  gamesRecord: number;
  mvp: number;
  totalGames: number;
  substitutionPerGame?: number;
  mostTeamPlayed?: number;
  averageGoalsPerGame: number;
}

export function getGoalKeeperStats(player: PlayerProfile): OutfieldProfileStats {
  const { function: playerFunction, Stats: playerStatsRaw } = player;
  const Stats = playerStatsRaw.filter((stat) => stat.function === 'GOALKEEPER');
  const goals = Stats.map((stat) => stat.goals).reduce((acc, current) => acc + current, 0);

  const assists = Stats.map((stat) => stat.assists).reduce((acc, current) => acc + current, 0);

  const substitutions = Stats.map((stat) => stat.substituition).reduce(
    (acc, current) => acc + current,
    0
  );
  const victories = Stats.filter((stat) => stat.currentTeam === stat.Game.winnerTeam).length;

  const defeats = Stats.filter(
    (stat) => stat.currentTeam !== stat.Game.winnerTeam && stat.Game.winnerTeam !== 'DRAW'
  ).length;

  const draws = Stats.filter(
    (stat) => stat.currentTeam !== stat.Game.winnerTeam && stat.Game.winnerTeam === 'DRAW'
  ).length;

  const totalGames = Stats.filter((stat) => stat.Game).length;

  const points = victories * 3 + draws * 1;

  const goalsPerGame = goals / totalGames;

  const gamesRecord = getGamesRecord(totalGames, victories, draws);

  const mvp = player.MOTM.length;

  const goalKeeper = Stats.filter((stat) => stat.function === 'GOALKEEPER');
  const goalsConcededOnWhiteTeam = goalKeeper
    .filter((stat) => stat.currentTeam === 'WHITE') // filtrei todos os jogos do X no time Branco
    .map((stat) => stat.Game.greenGoals)
    .reduce((acc, current) => acc + current, 0); //Desses jogos retornei todos os gols do time adversario

  const goalsConcededOnGreenTeam = goalKeeper
    .filter((stat) => stat.currentTeam === 'GREEN') // filtrei todos os jogos do X no time Preto
    .map((stat) => stat.Game.whiteGoals)
    .reduce((acc, current) => acc + current, 0); // Desses jogos retornei todos os gols do time adversario

  const goalsConceded = goalsConcededOnGreenTeam + goalsConcededOnWhiteTeam;

  const averageGoalsPerGame = goalsConceded / totalGames || 0.0;
  if (playerFunction === 'GOALKEEPER') {
    return {
      goals,
      goalsConceded: goalsConceded || 0.0,
      averageGoalsPerGame,
      assists,
      substitutions,
      victories,
      defeats,
      draws,
      goalsPerGame,
      points,
      gamesRecord,
      mvp,
      totalGames,
    };
  }
  return {
    goals,
    goalsConceded: 0,
    averageGoalsPerGame,
    assists,
    substitutions,
    victories,
    defeats,
    draws,
    goalsPerGame,
    points,
    gamesRecord,
    mvp,
    totalGames,
  };
}
