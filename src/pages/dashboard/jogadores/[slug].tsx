/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState } from 'react';
import { toast } from 'react-toastify';

import { GetStaticProps } from 'next';
import Image from 'next/image';

import { PlayerProfile } from '../../../..';
import { GameContainer } from '../../../components/Dashboard/DashboardGameContainer';
import { api } from '../../../services/axios';
export type JogadorProps = {
  player: PlayerProfile;
};
const Jogador = ({ player }: JogadorProps) => {
  const [currentPlayerPicture, setCurrentPlayerPicture] = useState<string | null>(
    player.currentPicture
  );
  const [uploadImageColor, setUploadImageColor] = useState<string>(
    player.currentPicture || 'GREEN'
  );
  const [picture, setPicture] = useState<FileList | null>(null);
  const [isLoading, setIsLoading] = useState<'loading' | 'not_loading'>('not_loading');
  const getGoalsPerGame = (vic: number, def: number, draw: number, goals: number): string => {
    const totalOfGames = vic + def + draw;
    const goalsPerGame = goals / totalOfGames;
    return goalsPerGame.toFixed(2).replace('.', ',');
  };
  const getProfileImage = ({
    whiteShirtpicture,
    greenShirtpicture,
    slug,
  }: PlayerProfile): string => {
    if (currentPlayerPicture === 'WHITE') {
      return whiteShirtpicture!;
    }
    if (currentPlayerPicture === 'GREEN') {
      return greenShirtpicture!;
    }
    return `https://ui-avatars.com/api/?name=${slug}?bold=true`;
  };

  const handleUploadImage = async () => {
    if (picture) {
      setIsLoading('loading');
      const formData = new FormData();
      formData.append('avatar', picture[0]);
      formData.append('shirtColor', uploadImageColor);
      const data = await api.post(`/players/upload/${player.id}`, formData);

      toast.success(
        `Foto ${data.data.image_url === 'GREEN' ? 'Verde' : 'Branco'} do jogador ${
          player.name
        } foi atualizada com sucesso`
      ),
        setIsLoading('not_loading');
      return;
    }

    return;
  };
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUploadImageColor(e.target.value);
  };
  if (player) {
    return (
      <div>
        <div className="mx-2  h-36  flex items-center gap-4">
          <Image
            src={getProfileImage(player)}
            alt={'Foto de perfil do jogador'}
            width={100}
            height={100}
            priority
            className="h-20 w-20 rounded-full"
          />
          <h1 className="text-xl">{player.name}</h1>
        </div>

        {/* The button to open modal */}
        <label htmlFor={`my-modal-${player.id}`} className="btn btn-sm btn-outline">
          Adicionar Fotos
        </label>

        {/* Put this part before </body> tag */}
        <input type="checkbox" id={`my-modal-${player.id}`} className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor={`my-modal-${player.id}`}
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 className="text-lg font-bold">Galeria</h3>
            <p className="text-[10px]">
              {' '}
              <i>* Clique em cima da foto para trocar</i>
            </p>
            <div className="flex gap-2 my-4 w-full justify-center ">
              {player.whiteShirtpicture && (
                <>
                  <img
                    className="h-24 w-24 rounded-xl border-[1px] cursor-pointer hover:scale-105 transition-all"
                    src={player.whiteShirtpicture}
                    alt=""
                    onClick={() => setCurrentPlayerPicture('WHITE')}
                  />
                </>
              )}

              {player.greenShirtpicture && (
                <>
                  <img
                    className="h-24 w-24 rounded-xl border-[1px] cursor-pointer hover:scale-105 transition-all"
                    src={player.greenShirtpicture}
                    alt=""
                    onClick={() => setCurrentPlayerPicture('GREEN')}
                  />
                </>
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold">Carregar nova foto</h3>
              <select
                className="select select-bordered select-sm w-full max-w-xs my-4"
                onChange={handleChange}
                defaultValue={uploadImageColor}
              >
                <option value={'GREEN'}>Verde</option>
                <option value={'WHITE'}>Branco</option>
              </select>
              <input
                type="file"
                className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                placeholder=""
                onChange={(e) => setPicture(e.target.files)}
              />
              <p>Cor selecionada: {uploadImageColor}</p>
              <button className={`btn btn-outline ${isLoading}`} onClick={handleUploadImage}>
                Salvar
              </button>
            </div>
          </div>
        </div>
        <div className="divider divider-vertical"></div>
        <div className="flex items-center gap-8 flex-wrap w-[60%]   md:mx-0 lg:mx-0 mx-auto my-4">
          {player.function === 'GOALKEEPER' ? (
            <div className="h-12 w-12  ">
              <p>Gols S</p>
              <p>{player.goalsConceded}</p>
            </div>
          ) : (
            <div className="h-12 w-12 flex flex-col items-center ">
              <p className="text-sm">Gols</p>
              <p className="font-bold text-lg text-white">{player.goals}</p>
            </div>
          )}
          <div className="h-12 w-12 flex flex-col items-center">
            <p>Vitorias</p>
            <p>{player.victories}</p>
          </div>
          <div className="h-12 w-12 flex flex-col items-center">
            <p>Derrotas</p>
            <p>{player.defeats}</p>
          </div>
          <div className="h-12 w-12 flex flex-col items-center">
            <p>Empates</p>
            <p>{player.draws}</p>
          </div>
          <div className="h-12 w-12 flex flex-col items-center">
            <p>Gols p/j</p>
            <p>{getGoalsPerGame(player.victories, player.defeats, player.draws, player.goals)}</p>
          </div>
          <div className="h-12 w-12 flex flex-col items-center">
            <p>Pontos</p>
            <p>1</p>
          </div>
          <div className="h-12 w-12 flex flex-col items-center">
            <p>Aprov</p>
            <p>1</p>
          </div>
        </div>
        <div className="divider divider-vertical"></div>
        <div className="w-[80%] flex flex-col gap-4 md:mx-0 lg:mx-0 mx-auto">
          {player.Stats.reverse().map((player) => (
            <GameContainer game={player.Game} key={player.Game.id} />
          ))}
        </div>
      </div>
    );
  }
};
export const getStaticProps: GetStaticProps = async (context) => {
  const { data: player } = await api.get<PlayerProfile>(`/players/${context?.params?.slug}`);

  return {
    props: {
      player,
    },
    revalidate: 5,
  };
};
export async function getStaticPaths() {
  const { data: players } = await api.get<PlayerProfile[]>('/players');

  return {
    paths: players.map((player) => {
      return {
        params: {
          slug: player.slug,
        },
      };
    }),
    fallback: false,
  };
}

export default Jogador;
