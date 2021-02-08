import { RESET_QUIZ, UPDATE_QUESTIONS_LIST } from "../actions"

const initialState = {
    questionIdList: new Array<string>()
};

const questionsInfoReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case UPDATE_QUESTIONS_LIST: {
        return {...state, questionIdList: [...state.questionIdList, action.payload.questionId]}
    }
    case RESET_QUIZ: {
        return {...state, ...initialState}
    }
    default: {
        return state;
    }
  }
};

export default questionsInfoReducer;
