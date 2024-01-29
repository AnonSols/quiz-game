import { REDUCER_TYPE, ReducerActionType } from "../../types/model";

type Prop = {
  opt: string;
  index: number;
  crtOpt: number;
  answer: null | number;
  dispatch: React.Dispatch<ReducerActionType>;
  points: number;
};

const Options = ({ opt, index, answer, crtOpt, dispatch, points }: Prop) => {
  const hasAnswered = answer !== null;
  const correctOption = index === crtOpt;
  return (
    <button
      className={`btn btn-option ${index === answer ? "answer" : ""} ${
        hasAnswered ? (correctOption ? "correct" : "wrong") : ""
      }`}
      disabled={hasAnswered}
      onClick={() => {
        dispatch({
          type: REDUCER_TYPE.ANSWER,
          payload: {
            answer: index,
            points: correctOption ? points : 0,
          },
        });
      }}
    >
      {opt}
    </button>
  );
};

export default Options;
