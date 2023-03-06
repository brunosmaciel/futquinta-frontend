import { Game } from './../../index.d';
const games: Game[] = [
  {
    id: 1,
    whiteGoals: 8,
    greenGoals: 17,
    whiteTeamMOTM: 'Benitez',
    greenTeamMOTM: 'Leozin',
    winnerTeam: 'GREEN',
    status: 'FINISHED',
    createdAt: new Date('2023-01-31T13:52:25.154Z'),
    updatedAt: new Date('2023-01-31T17:33:37.821Z'),
    playerId: null,
    players: [],
  },
  {
    id: 3,
    whiteGoals: 7,
    greenGoals: 10,
    whiteTeamMOTM: 'Rafinha',
    greenTeamMOTM: 'Fabuloso',
    winnerTeam: 'GREEN',
    status: 'FINISHED',
    createdAt: new Date('2023-02-01T09:46:04.732Z'),
    updatedAt: new Date('2023-02-01T09:54:12.109Z'),
    playerId: null,
    players: [],
  },
];

export { games };
