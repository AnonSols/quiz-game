type Prop = {
  index: number;
  length: number;
  points: number;
  answer: number | null;
  maxPoints: number;
};

const Progress = ({ index, length, points, answer, maxPoints }: Prop) => {
  return (
    <header className="progress">
      <progress max={length} value={index + Number(answer !== null)} />
      <p>
        {" "}
        Question <b> {index + 1} </b> / {length}
      </p>
      <p>
        <b>{points}</b> / {maxPoints} points
      </p>
    </header>
  );
};

export default Progress;
