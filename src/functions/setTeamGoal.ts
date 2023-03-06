import { api } from '../services/axios';

async function setTeamGoals(
  gameId: number,
  currentTeam: 'WHITE' | 'GREEN',
  goals: number
): Promise<void> {
  try {
    const currentGoals = goals++;
    console.log(currentGoals);
    // if (currentTeam === 'GREEN') {
    //   const data = await api.put(`/games/${gameId}`, {
    //     greenGoals: goals,
    //   });
    //   console.log(data);
    // }

    // if (currentTeam === 'WHITE') {
    //   const data = await api.put(`/games/${gameId}`, {
    //     greenGoals: goals,
    //   });
    //   console.log(data);
    // }
  } catch (err) {
    console.log(err);
  }
}

export { setTeamGoals };
