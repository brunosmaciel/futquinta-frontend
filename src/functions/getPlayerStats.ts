import { BolaMurcha, PlayerProfile } from '../..';
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
  goalsConcededPerGame: number;
  points: number;
  gamesRecord: number;
  mvp: number;
  totalGames: number;
  substitutionPerGame?: number;
  mostTeamPlayed?: number;
  bolaMurcha: number;
}

export function getPlayerStats(player: PlayerProfile): OutfieldProfileStats {
  const { playerPosition, Stats } = player;
  const goals = Stats.map((stat) => stat.goals).reduce((acc, current) => acc + current, 0);

  const assists = Stats.map((stat) => stat.assists).reduce((acc, current) => acc + current, 0);

  const substitutions = Stats.map((stat) => stat.substituition).reduce(
    (acc, current) => acc + current,
    0,
  );
  const victories = Stats.filter((stat) => stat.currentTeam === stat.Game.winnerTeam).length;

  const defeats = Stats.filter(
    (stat) => stat.currentTeam !== stat.Game.winnerTeam && stat.Game.winnerTeam !== 'DRAW',
  ).length;

  const draws = Stats.filter(
    (stat) => stat.currentTeam !== stat.Game.winnerTeam && stat.Game.winnerTeam === 'DRAW',
  ).length;

  const totalGames = Stats.filter((stat) => stat.Game).length;

  const points = victories * 3 + draws * 1;

  const goalsPerGame = goals / totalGames || 0.0;

  const gamesRecord = getGamesRecord(totalGames, victories, draws) || 0.0;

  const mvp = player.MOTM.length;
  const bolaMurcha = player?.BolaMurcha?.length || 0;

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

  const goalsConcededPerGame = (goalsConceded / goalKeeper.length).toFixed(2);
  if (playerPosition === 'GOALKEEPER') {
    return {
      goals,
      goalsConceded,
      goalsConcededPerGame: +goalsConcededPerGame,
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
      bolaMurcha,
    };
  }
  return {
    goals,
    goalsConceded: 0,
    goalsConcededPerGame: +goalsConcededPerGame,
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
    bolaMurcha,
  };
}
