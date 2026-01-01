import { createContext, useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { setCookie, parseCookies, destroyCookie } from 'nookies';

import { recoverUserData } from '../services/auth';
import { api } from '../services/axios';
import { localStorageKeys } from '../config/localStorageKeys';
import { toast } from 'react-hot-toast';
type User = {
  email: string;
};

type SignInData = {
  email: string;
  password: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  signIn: (data: SignInData) => Promise<void>;
  logOut: () => void;
};
type AxiosResponse = {
  token: string;
  user: {
    id?: number;
    email: string;
  };
};

const AuthContext = createContext({} as AuthContextType);

const AuthProvider = ({ children }: any) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const isLoggedIn = !!user;

  useEffect(() => {
    const token = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

    const getUser = async () => {
      try {
        const data = await recoverUserData();

        setUser({
          email: data.email,
        });
      } catch (err) {
        logOut();
        // toast.error('Sua sessao expirou');
      }
    };

    if (token) {
      getUser();
    }
  }, []);

  const signIn = async ({ email, password }: SignInData) => {
    try {
      const {
        data: { token, user },
      } = await api.post<AxiosResponse>('/users/auth', {
        email,
        password,
      });
      localStorage.setItem(localStorageKeys.ACCESS_TOKEN, token);

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      setUser(user);

      router.push('/dashboard');
      toast.success('Bem vindo');
    } catch (err: any) {
      throw new Error(err.response.data.message);
    }
  };
  const logOut = () => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
