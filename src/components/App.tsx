import { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import ErrorLoader from "./ErrorLoader";
import StartScreen from "./StartScreen";
import Question from "./Question/Question";
import { REDUCER_TYPE } from "../types/model";
import NexButton from "./User'sInfo/NexButton";
import Progress from "./Question/Progress";
import TimerButton from "./User'sInfo/TimerButton";

import FinishedScreen from "./Question/FinishedScreen";
import Footer from "./User'sInfo/Footer";
import { useQuestion } from "../context/questionContext";

export default function App() {
  const {
    highscore,
    points,
    name,
    dispatch,
    index,
    status,
    answer,
    questionLength,
    percentage,
    maxPossiblePoints,
  } = useQuestion();

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
  }, [dispatch]);

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
          <StartScreen>
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
            <Progress />

            <Question />

            <Footer>
              <TimerButton />

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
          <FinishedScreen>
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
