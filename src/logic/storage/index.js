export const saveGameToLocalStorage = ({board, turn}) =>    {
    localStorage.setItem('board', JSON.stringify(board))
    localStorage.setItem('turn', JSON.stringify(turn))
}

export const resetGameStorage = () => {
    localStorage.removeItem('board')
    localStorage.removeItem('turn')
}
