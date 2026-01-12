type IndexProps = {};

const Index = ({}: IndexProps) => {
  return (
    <>
      <main className="max-w-4xl mx-auto px-6 py-10  ">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold uppercase tracking-wide">Regulamento FutQuinta</h1>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
            Capítulo I — Das Premiações e Rankings
          </h2>

          <article className="space-y-3">
            <p>
              <strong>Artigo 1º</strong> — Para incentivar a competitividade saudável, o grupo
              premiará os destaques do ano de acordo com os seguintes critérios:
            </p>

            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                <strong>Ranking Geral:</strong> Premiação do 1º ao 5º lugar.
              </li>
              <li className="ml-4 text-sm text-gray-700">
                Critérios de desempate: Maior aproveitamento; Maior número de jogos; Maior número de
                vitórias.
              </li>

              <li>
                <strong>Aproveitamento:</strong> Premiação do 1º ao 5º lugar.
              </li>
              <li className="ml-4 text-sm text-gray-700">
                Critérios de desempate: Maior número de jogos; Maior número de vitórias.
              </li>

              <li>
                <strong>Artilharia:</strong> Premiação do 1º ao 5º lugar.
              </li>
              <li className="ml-4 text-sm text-gray-700">
                Critérios de desempate: Maior média de gols por jogo; Maior número de jogos.
              </li>

              <li>
                <strong>Goleiro Menos Vazado:</strong> Prêmio para o 1º lugar.
              </li>
              <li className="ml-4 text-sm text-gray-700">
                Critérios de desempate: Maior número de jogos; Maior aproveitamento.
              </li>

              <li>
                <strong>Craque do Ano:</strong> Prêmio para o 1º lugar.
              </li>
              <li className="ml-4 text-sm text-gray-700">
                Critérios de desempate: Maior número de jogos; Maior aproveitamento.
              </li>

              <li>
                <strong>Bagre do Ano:</strong> Definido por votação acumulativa dos atletas com pior
                desempenho.
              </li>
            </ul>
          </article>

          <article className="mt-6 space-y-3">
            <p>
              <strong>Artigo 2º</strong> — A votação para Craque e Bagre não é individual. O time
              decide em conjunto ao final do jogo.
            </p>
            <p className="ml-4 text-sm text-gray-700">
              Quórum mínimo de 5 jogadores. Caso contrário, a administração define o destaque.
            </p>

            <p>
              <strong>Artigo 3º</strong> — Frequência mínima de 45% anual para premiações (goleiros:
              40%).
            </p>
            <p>
              <strong>Artigo 4º</strong> — Rankings em até 36h e filmagens em até 72h após a
              partida.
            </p>

            <p>
              <strong>Artigo 5º</strong> — Vídeo de destaque (Hat-Trick) somente se o time vencer ou
              empatar.
            </p>
            <p className="ml-4 text-sm text-gray-700">
              Em caso de derrota, não haverá vídeo especial.
            </p>
          </article>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
            Capítulo II — Da Gestão Financeira e Inadimplência
          </h2>

          <article className="space-y-3">
            <p>
              <strong>Artigo 6º</strong> — Mensalidade de R$ 20,00, com ciclo iniciado no 5º dia
              útil.
            </p>
            <ul className="list-disc list-inside ml-4 text-sm text-gray-700">
              <li>2 meses em aberto: bloqueio imediato.</li>
              <li>3 meses em aberto: remoção definitiva.</li>
            </ul>

            <p>
              <strong>Artigo 7º</strong> — Pagamento do jogo até sexta-feira às 23h59.
            </p>
            <ul className="list-disc list-inside ml-4 text-sm text-gray-700">
              <li>Multa de R$ 10,00/dia a partir de sábado.</li>
              <li>Suspensão caso não pago até a próxima lista.</li>
            </ul>

            <p>
              <strong>Artigo 8º</strong> — Novos membros devem quitar mensalidades retroativas e
              uniforme.
            </p>
          </article>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
            Capítulo III — Dos Uniformes e Equipamentos
          </h2>

          <article className="space-y-3">
            <p>
              <strong>Artigo 9º</strong> — Uso obrigatório do uniforme oficial.
            </p>
            <ul className="list-disc list-inside ml-4 text-sm text-gray-700">
              <li>Calção preto liso permitido 1x por mês.</li>
              <li>Taxa de R$ 10,00 para uso de material reserva.</li>
            </ul>
          </article>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
            Capítulo IV — Da Lista e Desistências
          </h2>

          <article className="space-y-3">
            <p>
              <strong>Artigo 10º</strong> — Abertura da lista: terça-feira às 20h30min via reação
              👍.
            </p>

            <p>
              <strong>Artigo 11º</strong> — Multas de cancelamento:
            </p>
            <ul className="list-disc list-inside ml-4 text-sm text-gray-700">
              <li>Após meia-noite: R$ 30,00.</li>
              <li>A partir das 18h15min: R$ 50,00.</li>
              <li>Multas independem de justificativa.</li>
            </ul>
          </article>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
            Capítulo V — Das Regras de Quadra
          </h2>

          <article className="space-y-2">
            <p>
              <strong>Artigo 12º</strong> — Agressão física resulta em expulsão imediata.
            </p>
            <p>
              <strong>Artigo 13º</strong> — Carrinhos são proibidos.
            </p>
            <p>
              <strong>Artigo 14º</strong> — Faltas coletivas e shootout conforme regra.
            </p>
            <p>
              <strong>Artigo 15º</strong> — Na ausência de árbitro, prevalece o bom senso.
            </p>
            <p>
              <strong>Artigo 16º</strong> — Goleiro: máximo de 5 segundos com a bola.
            </p>
            <p>
              <strong>Artigo 17º</strong> — Tiro livre direto exige OK do goleiro.
            </p>
            <p>
              <strong>Artigo 18º</strong> — Gols diretos de saída não são válidos.
            </p>
            <p>
              <strong>Artigo 19º</strong> — Proibido recuo para as mãos do goleiro.
            </p>
          </article>
        </section>

        <section>
          <h2 className="text-2xl font-semibold border-b pb-2 mb-4 text-red-600">
            Capítulo VI — Comunicação e Transparência
          </h2>

          <article className="space-y-3">
            <p>
              <strong>Artigo 20º</strong> — Transparência total sobre pendências financeiras.
            </p>
            <p>
              <strong>Artigo 21º</strong> — Uso correto dos grupos oficiais.
            </p>
            <p>
              <strong>Artigo 22º</strong> — Retorno permitido após regularização.
            </p>
            <p>
              <strong>Artigo 23º</strong> — Imparcialidade total na aplicação das regras.
            </p>
          </article>
        </section>
      </main>
    </>
  );
};

export default Index;
