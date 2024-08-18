import { useRef, useState } from 'react';

import useSWR from 'swr';

import { Game, PlayerProfile } from '../..';
import { LoadingSpin } from '../components/Loading';
import { GeneralRanking } from '../components/Rankings/GeneralRanking';
import { GoalkeepersRankings } from '../components/Rankings/GoalkeepersRanking';
import { MOTMRanking } from '../components/Rankings/MOTMRanking';
import { TopScorersRanking } from '../components/Rankings/TopScorerRanking';
import { RecordRanking } from '../components/Rankings/RecordRanking';

const Rankings = () => {
  const { data: players, isLoading } = useSWR<PlayerProfile[]>('/players');
  const { data: games } = useSWR<Game[]>('/games');
  const totalNumberOfGames = games?.length;
  const [tab, setTab] = useState<number>(1);
  const tabsDiv = useRef<HTMLDivElement | null>(null);

  if (isLoading) {
    return <LoadingSpin />;
  }
  const handleTabChange = (e: any) => {
    const index = Array.from(e.target.parentNode.children).indexOf(e.target);
    const tabElements = Array.from(e.target.parentNode.children) as HTMLAnchorElement[];
    tabElements.map((element) => element.classList.remove('tab-active'));
    tabsDiv.current?.children[index].classList.add('tab-active');

    setTab(index + 1);
  };
  if (players) {
    const goalkeepers = players.filter(
      (player) => player.function === 'GOALKEEPER'
    ) as PlayerProfile[];
    return (
      <>
        <div className="tabs" ref={tabsDiv}>
          <a className="tab tab-lifted tab-active" onClick={handleTabChange}>
            Classificação geral
          </a>
          <a className="tab tab-lifted" onClick={handleTabChange}>
            Artilharia
          </a>
          <a className="tab tab-lifted" onClick={handleTabChange}>
            Aproveitamento
          </a>
          <a className="tab tab-lifted" onClick={handleTabChange}>
            Goleiros
          </a>
          <a className="tab tab-lifted" onClick={handleTabChange}>
            Craque do Ano
          </a>
        </div>
        {tab === 1 && <GeneralRanking players={players} />}
        {tab === 2 && <TopScorersRanking players={players} />}
        {tab === 3 && <RecordRanking />}
        {tab === 4 && (
          <GoalkeepersRankings numberOfGames={totalNumberOfGames || 0} players={goalkeepers} />
        )}
        {tab === 5 && (
          <MOTMRanking totalNumberOfGames={totalNumberOfGames || 0} players={players} />
        )}
      </>
    );
  }
};
export default Rankings;
