import confetti from "canvas-confetti";
import { useState } from "react";
import Square from "./components/Square";
import WinnerModal from "./components/WinnerModal";
import { TURNS } from "./constans";
import { checkEndGame, checkWinner } from "./logic/board";
import { resetGameStorage, saveGameToLocalStorage } from "./logic/storage";

function App() {
  const [board, setBoard] = useState(() => {
    //TODO: recuperar partida
    const boardFromStorage = window.localStorage.getItem('board')
   if (boardFromStorage) {
     return JSON.parse(boardFromStorage)
   }
    return Array(9).fill(null)
  }
  )
  const [turn, setTurn] = useState(() => {
      const turnFromStorage = window.localStorage.getItem('turn')
      return turnFromStorage ? JSON.parse(turnFromStorage) : TURNS.X
    }
  )
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()

  }

  const updateBoard = (index) => {

    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn)
    //guardar partida
    saveGameToLocalStorage({
      board: newBoard,
      turn: newTurn
    })
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    }
    //TODO:Check if game is over
    else if (checkEndGame(newBoard)) {
      setWinner(false)
    }

  }

  return (
    <main className="board">
      <h1> Juego del gato</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section>
        <div className="game">
          {
            board.map((_, index) => {
              return (
                <Square
                  key={index}
                  index={index}
                  updateBoard={updateBoard}
                >
                  {board[index]}
                </Square>
              )
            })
          }
        </div>
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square >
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
