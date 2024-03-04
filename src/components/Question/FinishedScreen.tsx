import React from "react";
import { REDUCER_TYPE } from "../../types/model";
import { useQuestion } from "../../context/questionContext";

type prop = {
  children: React.ReactNode;
};
const FinishedScreen = ({ children }: prop) => {
  let emoji!: string;

  const { percentage, dispatch, highscore } = useQuestion();
  if (percentage === 100) emoji = "💰";
  if (percentage >= 80 && percentage < 100) emoji = "🍾";
  if (percentage >= 50 && percentage <= 80) emoji = "🤓";
  if (percentage >= 0 && percentage < 50) emoji = "🤕";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        {emoji} {children}
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: REDUCER_TYPE.RESTART })}
      >
        Restart Quiz
      </button>
    </>
  );
};

export default FinishedScreen;
