import { useContext, useState } from 'react';

import { useRouter } from 'next/router';

import { AuthContext } from '../contexts/AuthContex';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext);
  const [loading, setLoading] = useState<'loading' | 'not_loading'>('not_loading');
  const router = useRouter();
  const handleLogin = async () => {
    setLoading('loading');
    // TODO: Validade form
    try {
      await signIn({ email, password });

      setLoading('not_loading');
      router.push('/dashboard');
    } catch (err: any) {
      setLoading('not_loading');
    }
  };
  return (
    <section className="flex justify-center">
      <div className="form-control ">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <label className="input-group">
          <span>Email</span>
          <input
            type="text"
            placeholder="Seu email"
            className="input input-bordered"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="label">
          <span className="label-text">Senha</span>
        </label>
        <label className="input-group">
          <span>Senha</span>
          <input
            type="password"
            placeholder="Sua senha"
            className="input input-bordered"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className={`btn  mt-7 ${loading}`} onClick={handleLogin}>
          Login
        </button>
      </div>
    </section>
  );
};

export default Login;
