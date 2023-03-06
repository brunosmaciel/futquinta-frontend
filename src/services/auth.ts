import { api } from './axios';
type RecoverUserDataResponse = {
  id: number;
  email: string;
  iat: number;
  exp: number;
};
async function recoverUserData() {
  return (await api('/users/me')) as RecoverUserDataResponse;
}

export { recoverUserData };
