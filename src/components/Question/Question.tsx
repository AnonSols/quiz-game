import { useQuestion } from "../../context/questionContext";
import Options from "./Options";

const Question = () => {
  const { dispatch, answer, index, question: que } = useQuestion();
  const question = que[index];
  return (
    <div>
      <h4>{question.question}</h4>

      <div className=" options">
        {question.options.map((option, index) => (
          <Options
            opt={option}
            index={index}
            points={question.points}
            answer={answer}
            dispatch={dispatch}
            crtOpt={question.correctOption}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Question;
