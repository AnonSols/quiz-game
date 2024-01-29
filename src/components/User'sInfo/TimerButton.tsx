import { useEffect } from "react";
import { REDUCER_TYPE, ReducerActionType } from "../../types/model";

type Prop = {
  time: number;
  dispatch: React.Dispatch<ReducerActionType>;
};
const TimerButton = ({ time, dispatch }: Prop) => {
  const min = Math.floor(time / 60);
  const sec = time % 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: REDUCER_TYPE.TIMER });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);
  return (
    <div className="timer">
      {min < 10 && "0"}
      {min}:{sec < 10 && "0"}
      {sec}
    </div>
  );
};

export default TimerButton;
