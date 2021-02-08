import { RESET_QUIZ, RESTART_QUIZ, SET_ROUND, UPDATE_GAME_STATUS, } from "../actions"

import { GameStatus } from '../../types'

const roundsAmountDefault = 30
const timePeriodInSecondsDefault = 30

const initialState = {
    roundsAmount: roundsAmountDefault,
    timePeriodInSeconds: timePeriodInSecondsDefault,
    round: 1,
    score: 0,
    gameStatus: GameStatus.NotStarted
};

const quizInfoReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case SET_ROUND: {
            return { ...state, round: state.round + 1, score: state.score === 0 ? 1 : (state.score * 2) }
        }
        case RESET_QUIZ: {
            return { ...state, ...initialState }
        }
        case RESTART_QUIZ: {
            return { ...state, ...initialState, gameStatus: GameStatus.Playing }
        }
        case UPDATE_GAME_STATUS: {
            console.log("UPD")
            if (state.gameStatus === GameStatus.Playing) {
                return action.payload.hasWrongAnswer ? { ...state, gameStatus: GameStatus.Lost } : {
                    ...state, gameStatus: state.round > state.roundsAmount ? GameStatus.Won : GameStatus.Playing
                }
            } else {
                return { ...state, gameStatus: GameStatus.Playing }
            }
        }
        default: {
            return state;
        }
    }
};

export default quizInfoReducer;
