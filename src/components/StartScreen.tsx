import { REDUCER_TYPE, ReducerActionType } from "../types/model";

type Props = {
  length: number;
  dispatch: React.Dispatch<ReducerActionType>;
  children: React.ReactNode;
  name: string | undefined;
  score: number;
};

const StartScreen = ({ length, dispatch, children, name, score }: Props) => {
  const nameLength = name?.length;
  return (
    <div className="start">
      <h2>Welcome to the react quiz</h2>
      <h3>{length} questions to test your React skills</h3>
      {/* look for how to check for empty space in input and fix input space bug. */}
      {children}
      {nameLength
        ? nameLength >= 4 &&
          name.trim() && (
            <button
              className="btn btn-ui"
              onClick={() => dispatch({ type: REDUCER_TYPE.DATA_ACTIVE })}
            >
              {" "}
              Let's begin
            </button>
          )
        : ""}
      <br />
      {score > 0 && (
        <div className="highscore">
          <br />
          <p>
            Current high score is <strong>{score}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default StartScreen;
