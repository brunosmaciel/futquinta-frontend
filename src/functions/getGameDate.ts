import { addHours } from 'date-fns';
export function getGameDate(date: string) {
  return addHours(new Date(date), 3).toLocaleDateString('pt-BR');
}
