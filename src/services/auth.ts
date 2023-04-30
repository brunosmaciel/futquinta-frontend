import { api } from './axios';
type RecoverUserDataResponse = {
  id: number;
  email: string;
  iat: number;
  exp: number;
};
async function recoverUserData() {
  const { data } = await api('/users/me');

  return data;
}

export { recoverUserData };
