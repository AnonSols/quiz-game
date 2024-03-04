import { useQuestion } from "../context/questionContext";
import { REDUCER_TYPE } from "../types/model";

type Props = {
  children: React.ReactNode;
};

const StartScreen = ({ children }: Props) => {
  const { dispatch, name, questionLength, highscore } = useQuestion();
  const nameLength = name?.length;
  return (
    <div className="start">
      <h2>Welcome to the react quiz</h2>
      <h3>{questionLength} questions to test your React skills</h3>
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
      {highscore > 0 && (
        <div className="highscore">
          <br />
          <p>
            Current high score is <strong>{highscore}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default StartScreen;
