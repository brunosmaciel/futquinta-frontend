function main() {
  const data = [
    {
      name: 'M.Godoy',
      goals: 5,
      goalsPerGame: 0.63,
    },
    {
      name: 'João Ribeiro',
      goals: 5,
      goalsPerGame: 0.63,
    },
    {
      name: 'João Neves',
      goals: 5,
      goalsPerGame: 0.1,
    },
  ];

  const rank = data.sort((a, b) => {
    if (a.name < b.name) {
      if (a.goalsPerGame > b.goalsPerGame) {
        if (a.goals > b.goals) return -1;
        return -1;
      }

      return -1;
    }
  });

  console.log(rank);
}

main();
