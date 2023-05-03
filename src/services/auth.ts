import { api } from './axios';
type RecoverUserDataResponse = {
  id: number;
  email: string;
  iat: number;
  exp: number;
};
async function recoverUserData(): Promise<RecoverUserDataResponse> {
  const { data } = await api<RecoverUserDataResponse>('/users/me');

  return data;
}

export { recoverUserData };
