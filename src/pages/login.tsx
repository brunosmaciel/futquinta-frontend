import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useRouter } from 'next/navigation';

import { AuthContext } from '../contexts/AuthContex';
export type LoginInputs = {
  email: string;
  password: string;
};
const Login = () => {
  const { register, handleSubmit } = useForm<LoginInputs>();
  const { signIn } = useContext(AuthContext);
  const [loading, setLoading] = useState<'loading' | 'not_loading'>('not_loading');
  const [showPassword, setShowPassword] = useState(false);
  const { push } = useRouter();

  const handleLogin = async (data: LoginInputs) => {
    try {
      setLoading('loading');
      await signIn(data);
      push(`/dashboard/`);
    } catch (err: any) {
      setLoading('not_loading');
    }
  };
  return (
    <section className="flex justify-center">
      <form className="form-control w-[80%] max-w-[320px]" onSubmit={handleSubmit(handleLogin)}>
        <div>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-primary w-full max-w-xs autofill:bg-none"
            {...register('email')}
            autoComplete="off"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Senha</span>
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Type here"
            className="input input-bordered input-primary w-full max-w-xs"
            {...register('password')}
          />
        </div>
        <label className="label cursor-pointer">
          <span className="label-text">Mostrar senha</span>
          <input
            type="checkbox"
            className="toggle"
            onChange={() => setShowPassword((prev) => !prev)}
          />
        </label>
        <button className={`btn btn-primary mt-7 ${loading}`}>Entrar</button>
      </form>
    </section>
  );
};

export default Login;
