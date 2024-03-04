import { useQuestion } from "../../context/questionContext";

const Progress = () => {
  const {
    index,
    questionLength: length,
    points,
    answer,
    maxPossiblePoints,
  } = useQuestion();

  console.log();
  return (
    <header className="progress">
      <progress max={length} value={index + Number(answer !== null)} />
      <p>
        {" "}
        Question <b> {index + 1} </b> / {length}
      </p>
      <p>
        <b>{points}</b> / {maxPossiblePoints} points
      </p>
    </header>
  );
};

export default Progress;
