import { useEffect } from "react";
import { REDUCER_TYPE } from "../../types/model";
import { useQuestion } from "../../context/questionContext";

const TimerButton = () => {
  const { secondsRemaing: time, dispatch } = useQuestion();
  const min = time && Math.floor(time / 60);
  const sec = time && time % 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: REDUCER_TYPE.TIMER });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);
  return (
    <div className="timer">
      {min && min < 10 && "0"}
      {min}:{sec && sec < 10 && "0"}
      {sec}
    </div>
  );
};

export default TimerButton;
