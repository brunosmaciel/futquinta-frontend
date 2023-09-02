export function getPlayerGameResult(playerCurrentTeam: string, gameWinnerTeam: string) {
  if (playerCurrentTeam === gameWinnerTeam) {
    return 'V';
  }
  if (playerCurrentTeam !== gameWinnerTeam && gameWinnerTeam === 'DRAW') {
    return 'E';
  }

  return 'D';
}
