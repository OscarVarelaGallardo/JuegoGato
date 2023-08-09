import { WINNER_COMBOS } from "../constans"


export const checkWinner = (newCheckBoardWinner) => {

    for (const combo of WINNER_COMBOS) {
        const [a, b, c] = combo
        if (newCheckBoardWinner[a] && newCheckBoardWinner[a] === newCheckBoardWinner[b] && newCheckBoardWinner[a] === newCheckBoardWinner[c]) {
            return newCheckBoardWinner[a]
        }
    }
    return null
}

export const checkEndGame = (newCheckBoardWinner) => {
    return newCheckBoardWinner.every((item) => item !== null)

}