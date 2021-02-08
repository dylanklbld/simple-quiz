export const SET_ROUND = "SET_ROUND";
export const RESET_QUIZ = "RESET_QUIZ";
export const RESTART_QUIZ = "RESTART_QUIZ";
export const UPDATE_QUESTIONS_LIST = "UPDATE_QUESTIONS_LIST";
export const UPDATE_GAME_STATUS = "UPDATE_GAME_STATUS";

export const setRound = () => ({
  type: SET_ROUND
});

export const resetQuiz = () => ({
    type: RESET_QUIZ
});

export const restartQuiz = () => ({
  type: RESTART_QUIZ
});

export const updateGameStatus = (hasWrongAnswer?:boolean) => ({
  type: UPDATE_GAME_STATUS,
  payload: {
    hasWrongAnswer: Boolean(hasWrongAnswer)
  }
});

export const updateQuestionList = (questionId:number) => ({
    type: UPDATE_QUESTIONS_LIST,
    payload: {
        questionId
    }
});