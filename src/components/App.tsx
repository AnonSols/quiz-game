import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import ErrorLoader from "./ErrorLoader";
import StartScreen from "./StartScreen";
import Question from "./Question/Question";
import { REDUCER_TYPE, ReducerActionType, StateProp } from "../types/model";
import NexButton from "./User'sInfo/NexButton";
import Progress from "./Question/Progress";
import TimerButton from "./User'sInfo/TimerButton";

import FinishedScreen from "./Question/FinishedScreen";
import Footer from "./User'sInfo/Footer";

export default function App() {
  // const [dispatch,( state, question, index)] = useReducerState();
  const InitialState: StateProp = {
    question: [],
    index: 0,
    status: "loading",
    answer: null,
    points: 0,
    highscore: Number(localStorage.getItem("score")) || 0,
    secondsRemaing: 0,
    name: "",
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
  ] = useReducer(reducer, InitialState);

  const questionLength = question.length;
  const maxPossiblePoints = question.reduce(
    (prev, curr) => prev + curr.points,
    0
  );
  const percentage = (points / maxPossiblePoints) * 100;

  useEffect(() => {
    const controller = new AbortController();
    document.title = "React quiz";
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:9000/questions", {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("There was an error fetching data");

        const data = await res.json();

        dispatch({
          type: REDUCER_TYPE.DATA_RECIEVED,
          payload: { question: data },
        });
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.log((error as Error).message);
          dispatch({
            type: REDUCER_TYPE.DATA_ERROR,
            payload: { error: (error as Error).message },
          });
        }
      }
    }

    fetchData();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    localStorage.setItem("score", JSON.stringify(highscore));
  }, [highscore]);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorLoader />}
        {status === "ready" && (
          <StartScreen
            length={questionLength}
            dispatch={dispatch}
            name={name}
            score={highscore}
          >
            <div>
              <input
                type="text"
                className="btn btn ui"
                placeholder="What's your name?"
                value={name}
                onChange={(e) =>
                  dispatch({
                    type: REDUCER_TYPE.USERSNAME,
                    payload: { event: e },
                  })
                }
              />
              <br />
              {/* <input
                type="number"
                className="btn btn ui"
                placeholder="set your time"
              /> */}
              <br />
            </div>
          </StartScreen>
        )}
        {status === "active" && (
          <>
            <Progress
              points={points}
              length={questionLength}
              index={index}
              answer={answer}
              maxPoints={maxPossiblePoints}
            />

            <Question
              question={question[index]}
              dispatch={dispatch}
              answer={answer}
              points={points}
            />

            <Footer username={name} points={points}>
              <TimerButton time={secondsRemaing} dispatch={dispatch} />

              <NexButton>
                <div>
                  {answer !== null && (
                    <div
                      className="btn btn-ui"
                      onClick={() => {
                        if (index + 1 === questionLength)
                          dispatch({
                            type: REDUCER_TYPE.DATA_FINISHED,
                          });
                        else
                          dispatch({
                            type: REDUCER_TYPE.NEXT,
                          });
                      }}
                    >
                      {index + 1 === questionLength ? "Submit" : "Next"}
                    </div>
                  )}
                </div>
              </NexButton>
            </Footer>
          </>
        )}

        {status === "finished" && (
          <FinishedScreen
            percentage={percentage}
            dispatch={dispatch}
            highscore={highscore}
          >
            <>
              {name} You scored <b>{points}</b> out of {maxPossiblePoints} (
              {Math.ceil(percentage)}%)
            </>
          </FinishedScreen>
        )}
      </Main>
    </div>
  );
}
