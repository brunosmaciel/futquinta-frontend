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
  goals: number;
  assists: number;
  goalsConceded: number | null;
  victories: number;
  defeats: number;
  draws: number;
  function: PlayerFunction;
  MOTMScore: number | null;
  Stats: PlayerStats[];
  createdAt: Date;
  updatedAt: Date;
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

export type Winner = (typeof Winner)[keyof typeof Winner];
