import { useReducer } from "react";
import { REDUCER_TYPE, ReducerActionType, StateProp } from "../types/model";

export const useReducerState = () => {
  const InitialState: StateProp = {
    question: [],
    index: 0,
    //loading, error, ready, active, finished
    status: "loading",
  };

  function reducer(
    state: typeof InitialState,
    action: ReducerActionType
  ): typeof InitialState {
    switch (action.type) {
      case REDUCER_TYPE.DATA_RECIEVED:
        return {
          ...state,
          question: action.payload?.question ?? [],
          status: "ready",
        };

      case REDUCER_TYPE.DATA_ERROR:
        return { ...state, status: "error" };

      case REDUCER_TYPE.DATA_ACTIVE:
        return { ...state, status: "active" };

      case REDUCER_TYPE.DATA_FINISHED:
        return { ...state, status: "finished" };

      default:
        throw new Error(
          "This code is never to be reached, unreachable code reached."
        );
    }
  }

  const [{ status, index, question }, dispatch] = useReducer(
    reducer,
    InitialState
  );

  return { dispatch, ...{ status, index, question } };
};
