import React from "react";
import { REDUCER_TYPE, ReducerActionType } from "../../types/model";

type prop = {
  children: React.ReactNode;
  percentage: number;
  dispatch: React.Dispatch<ReducerActionType>;
  highscore: number;
};
const FinishedScreen = ({
  children,
  percentage,
  dispatch,
  highscore,
}: prop) => {
  let emoji!: string;

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
