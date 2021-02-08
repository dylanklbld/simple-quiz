import { combineReducers } from "redux";
import questionsReducer from "./questions";
import quizInfoReducer from "./quizInfo";

const rootReducer = combineReducers({
    questions: questionsReducer,
    quizInfo: quizInfoReducer
  });

  
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer