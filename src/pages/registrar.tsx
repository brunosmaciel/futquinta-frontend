import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { AuthContext } from '../contexts/AuthContex';
import { useButtonLoading } from '../hooks/useButtonLoading';
import { Button } from '../components/Button';
import { api } from '../services/axios';
import { toast } from 'react-toastify';
export type LoginInputs = {
  email: string;
  password: string;
};
const Registrar = () => {
  const { register, handleSubmit } = useForm<LoginInputs>();
  const { signIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const { setButtonLoading: setLoading, isButtonLoading } = useButtonLoading();
  const { push } = useRouter();

  const handleLogin = async ({ email, password }: LoginInputs) => {
    setLoading(true);
    try {
      const { data: signupData } = await api.post('/users', {
        email,
        password,
      });

      if (!signupData) {
        toast.error('Erro desconhecido ao criar sua conta');

        return;
      }

      await signIn({ email, password });
    } catch (err: any) {
      setLoading(false);
    }
  };
  return (
    <section className="flex justify-center items-center  h-full">
      <form className="form-control w-[80%] max-w-[320px]" onSubmit={handleSubmit(handleLogin)}>
        <div>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            placeholder="Email"
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
            placeholder="senha"
            className="input input-bordered input-primary w-full max-w-xs"
            {...register('password')}
          />
        </div>
        <label className="label cursor-pointer mt-2">
          <span className="label-text">Mostrar senha</span>
          <input
            type="checkbox"
            className="toggle"
            onChange={() => setShowPassword((prev) => !prev)}
          />
        </label>
        <Button isLoading={isButtonLoading} className={`btn btn-primary mt-7`}>
          Criar conta
        </Button>
      </form>
    </section>
  );
};

export default Registrar;
