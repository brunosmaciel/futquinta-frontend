import { useRef } from 'react';
import { Button } from '../../Button';
import { Plus } from 'lucide-react';
import { format } from 'date-fns';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useButtonLoading } from '../../../hooks/useButtonLoading';
import { api } from '../../../services/axios';
import { Game } from '../../../..';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface ICreateGameModalProps {
  nextFixture: number;
}

const createGameSchema = z.object({
  date: z.string().transform((value) => `${value}T19:15:00`),
  fixture: z
    .string({
      required_error: 'Uma rodada deve ser informada',
    })
    .transform((value) => +value),
});
type CreateGameSchema = z.infer<typeof createGameSchema>;
export function CreateGameModal({ nextFixture }: ICreateGameModalProps) {
  const { setButtonLoading, isButtonLoading } = useButtonLoading();
  const router = useRouter();
  const today = format(new Date(), 'yyyy-MM-dd');
  const { handleSubmit, formState, register } = useForm<CreateGameSchema>({
    resolver: zodResolver(createGameSchema),
    defaultValues: {
      fixture: nextFixture,
    },
  });
  const createGameModal = useRef<HTMLDialogElement>(null);

  const handleCreateGame = async ({ fixture, date }: CreateGameSchema) => {
    try {
      setButtonLoading(true);

      const { data } = await api.post<Game>('/games', {
        gameDate: date,
        fixture,
      });

      router.push(`/dashboard/jogos/${data.id}`);
      toast.success('Partida criada com sucesso');
    } catch (err: any) {
      console.log(err.response.data);
      setButtonLoading(false);
    }

    createGameModal.current?.close();
  };

  return (
    <>
      {/* Open the modal using ID.showModal() method */}
      <div
        className="tooltip  tooltip-left fixed bottom-4 right-4 tooltip-secondary"
        data-tip="Nova partida"
      >
        <Button
          onClick={() => createGameModal.current?.showModal()}
          className="cursor-pointer text-inherit btn btn-primary btn-circle "
        >
          <Plus data-tip="Criar um novo jogador" size={30} />
        </Button>
      </div>
      <dialog ref={createGameModal} id="create_game_modal" className="modal">
        <form
          onSubmit={handleSubmit(handleCreateGame)}
          method="dialog"
          className="modal-box max-w-xs"
        >
          <div className="flex flex-row-reverse gap-2">
            <Button
              onClick={(e) => {
                e.preventDefault();
                createGameModal.current?.close();
              }}
              className="btn btn-sm btn-circle btn-ghost  right-2 top-2"
            >
              ✕
            </Button>
            <h3 className="font-bold text-lg text-center flex-1">Criar nova partida</h3>
          </div>
          <div className="flex flex-col gap-2">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Dia do jogo</span>
              </label>
              <input
                type="date"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                defaultValue={today}
                {...register('date')}
              />
            </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Rodada</span>
              </label>
              <input
                defaultValue={nextFixture}
                type="text"
                placeholder="Ex: 10"
                className="input input-bordered w-full "
                autoComplete="off"
                pattern="[0-9]*"
                inputMode="numeric"
                {...register('fixture')}
              />
              {formState.errors.fixture?.message && (
                <span>{formState.errors.fixture?.message}</span>
              )}
            </div>
          </div>
          <Button className="btn btn-primary w-full mt-4">Criar</Button>
        </form>
      </dialog>
    </>
  );
}
