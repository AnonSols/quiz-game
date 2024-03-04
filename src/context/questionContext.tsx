import { ReactNode, createContext, useContext, useReducer } from "react";
import { REDUCER_TYPE, ReducerActionType, StateProp } from "../types/model";

const initialState: StateProp = {
  question: [],
  index: 0,
  status: "loading",
  answer: null,
  points: 0,
  highscore: Number(localStorage.getItem("score")) || 0,
  secondsRemaing: 0,
  name: "",
};

type ContextProp = typeof initialState & {
  dispatch: React.Dispatch<ReducerActionType>;
  questionLength: number;
  percentage: number;
  maxPossiblePoints: number;
};

const QuestionContext = createContext<ContextProp | undefined>(undefined);

type ProviderProp = {
  children: ReactNode;
};

function QuestionProvider({ children }: ProviderProp) {
  function reducer(
    state: typeof initialState,
    action: ReducerActionType
  ): typeof initialState {
    switch (action.type) {
      case REDUCER_TYPE.DATA_RECIEVED:
        return {
          ...state,
          question: action.payload?.question ?? [],
          status: "ready",
        };

      case REDUCER_TYPE.DATA_ERROR:
        return { ...state, status: "error" };

      case REDUCER_TYPE.USERSNAME:
        return {
          ...state,
          name: action.payload?.event?.target.value,
        };

      case REDUCER_TYPE.DATA_ACTIVE:
        return {
          ...state,
          status: "active",
          secondsRemaing:
            state.question.length * REDUCER_TYPE.SECS_PER_QUESTION,
        };

      case REDUCER_TYPE.DATA_FINISHED:
        return {
          ...state,
          status: "finished",
          index: 0,
          answer: null,
          highscore:
            state.points > state.highscore ? state.points : state.highscore,
        };

      case REDUCER_TYPE.ANSWER:
        // Unexpected lexical declaration in case block.eslintno-case-declarations
        return {
          ...state,
          answer: action.payload?.answer ?? null,
          points: action.payload?.points
            ? state.points + (action.payload?.points ?? state.points)
            : state.points,
        };

      case REDUCER_TYPE.NEXT:
        return {
          ...state,
          index: state.index++,
          answer: null,
        };

      case REDUCER_TYPE.RESTART:
        return {
          ...state,
          status: "ready",
          points: 0,
          index: 0,
          name: "",
          answer: null,
        };

      case REDUCER_TYPE.TIMER:
        return {
          ...state,
          status: state.secondsRemaing === 1 ? "finished" : state.status,
          secondsRemaing: state.secondsRemaing - 1,
          highscore:
            state.points > state.highscore ? state.points : state.highscore,
        };

      default:
        throw new Error(
          "This code is never to be reached, unreachable code reached."
        );
    }
  }

  const [
    {
      status,
      index,
      question,
      answer,
      points,
      highscore,
      secondsRemaing,
      name,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const questionLength = question.length;
  console.log(questionLength)
  const maxPossiblePoints = question.reduce(
    (prev, curr) => prev + curr.points,
    0
  );
  const percentage = (points / maxPossiblePoints) * 100;

  return (
    <QuestionContext.Provider
      value={{
        status,
        index,
        question,
        answer,
        points,
        highscore,
        secondsRemaing,
        name,
        questionLength,
        percentage,
        maxPossiblePoints,
        dispatch,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

function useQuestion() {
  const context = useContext(QuestionContext);

  if (context === undefined)
    throw new Error("Context was used outside a provider");
  console.log(context);
  return context;
}
export { useQuestion, QuestionProvider };
