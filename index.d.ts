export type GeneralRankingAPIType = {
  position: string;
  name: string;
  slug: string;
  points: number;
  totalGames: number;
  draws: number;
  gamesRecord: number;
  picture: string;
};

/**
 * Model User
 *
 */
export type User = {
  id: number;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};
export type _count = {
  Stats: number;
  games: number;
  MOTM: number;
};
/**
 * Model PlayerProfile
 *
 */
export type PlayerProfile = {
  id: number;
  name: string;
  greenShirtpicture: string | null;
  whiteShirtpicture: string | null;
  currentPicture: string | null;
  shirtNumber: number;
  slug: string;
  goals: number;
  assists: number;
  goalsConceded: number | null;
  victories: number;
  defeats: number;
  draws: number;
  function: PlayerFunction;
  MOTM: MOTM[];
  Stats: PlayerStats[];
  _count: _count;
  createdAt: Date;
  updatedAt: Date;
  role: PlayerRole;
};

/**
 * Model Game
 *
 */
export type Game = {
  id: number;
  whiteGoals: number;
  greenGoals: number;
  whiteTeamMOTM: string | null;
  greenTeamMOTM: string | null;
  winnerTeam: Winner;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  playerId: number | null;
  players: PlayerStats[];
  MOTM: MOTM[];
  gamePicture: string | null;
  gameDate: Date;
};

/**
 * Model PlayerStats
 *
 */
export type PlayerStats = {
  id: number;
  name: string;
  goals: number;
  assists: number;
  substituition: number;
  goalsConceded: number | null;
  function: PlayerFunction;
  currentTeam: Team;
  playerId: number;
  gameId: number | null;
  MOTM: MOTM[];
  Game: Game;
  player: PlayerProfile;
  createdAt: string;
  updatedAt: string;
  _count: {
    Stats: number;
    games: number;
    MOTM: number;
  };
};

export type MOTM = {
  id: number;
  team: Team;
  playerProfileId: number;
  player: PlayerProfile;
  Game: Game[];
};

export type GetTopScorersType = {
  id: number;
  name: string;
  slug: string;
  currentPicture: string | null;
  whiteShirtpicture: string | null;
  greenShirtpicture: string | null;
  shirtNumber: number;
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
};

/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const PlayerFunction: {
  OUTFIELDPLAYER: 'OUTFIELDPLAYER';
  GOALKEEPER: 'GOALKEEPER';
};

export type PlayerFunction = (typeof PlayerFunction)[keyof typeof PlayerFunction];

export const Status: {
  NOT_STARTED: 'NOT_STARTED';
  IN_PROGRESS: 'IN_PROGRESS';
  FINISHED: 'FINISHED';
};

export type Status = (typeof Status)[keyof typeof Status];

export const Team: {
  WHITE: 'WHITE';
  GREEN: 'GREEN';
};

export type Team = (typeof Team)[keyof typeof Team];

export const Winner: {
  WHITE: 'WHITE';
  GREEN: 'GREEN';
  DRAW: 'DRAW';
};
export const PlayerRole: {
  PERMANENT: 'PERMANENT';
  GUEST: 'GUEST';
};

export type PlayerRole = (typeof PlayerRole)[keyof typeof PlayerRole];

export type Winner = (typeof Winner)[keyof typeof Winner];
