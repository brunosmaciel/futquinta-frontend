import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { AuthContext } from '../contexts/AuthContex';
import { Button } from '../components/Button';
import { useButtonLoading } from '../hooks/useButtonLoading';
import { toast } from 'react-hot-toast';
export type LoginInputs = {
  email: string;
  password: string;
};
const Login = () => {
  const { register, handleSubmit } = useForm<LoginInputs>();
  const { signIn } = useContext(AuthContext);
  const { isButtonLoading, setButtonLoading } = useButtonLoading();
  const [showPassword, setShowPassword] = useState(false);
  const { push } = useRouter();

  const handleLogin = async (data: LoginInputs) => {
    try {
      setButtonLoading(true);

      await signIn(data);
      push(`/dashboard/jogos`);
    } catch (err: any) {
      toast.error('Credenciais inválidas');

      setButtonLoading(false);
    }
  };
  return (
    <>
      <section className="flex flex-col gap-4 justify-center items-center  h-full">
        <div className="text-center text-3xl font-bold -tracking-tight border-b-2 border-primary w-52">
          <h1>Bem Vindo</h1>
        </div>
        <form
          className="w-full max-w-xs flex flex-col items-center"
          onSubmit={handleSubmit(handleLogin)}
        >
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered w-full max-w-xs"
              {...register('email')}
              autoComplete="off"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Senha</span>
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              className="input input-bordered w-full max-w-xs"
              {...register('password')}
            />
          </div>

          <label className="label cursor-pointer mt-2 flex justify-between gap-2  w-full max-w-xs">
            <span className="label-text">Mostrar senha</span>
            <input
              type="checkbox"
              className="toggle"
              onChange={() => setShowPassword((prev) => !prev)}
            />
          </label>
          <Button
            isLoading={isButtonLoading}
            className={`btn btn-primary flex items-center justify-center mt-4 `}
          >
            Entrar
          </Button>
        </form>
      </section>
    </>
  );
};

export default Login;
