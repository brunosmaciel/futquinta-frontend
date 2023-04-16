import { createContext, useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { setCookie, parseCookies, destroyCookie } from 'nookies';

import { recoverUserData } from '../services/auth';
import { api } from '../services/axios';
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
    const { token } = parseCookies();

    if (token) {
      recoverUserData().then(({ email }) => {
        setUser({
          email,
        });
      });
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
      setCookie(undefined, 'token', token, {
        maxAge: 7 * 24 * 60 * 60, // 7d
      });
      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      setUser(user);

      router.push('/dashboard');
    } catch (err: any) {
      console.log(err);
      throw new Error(err.response.data.message);
    }
  };
  const logOut = () => {
    destroyCookie(undefined, 'token');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
