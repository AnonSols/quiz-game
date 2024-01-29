import { QuestType, ReducerActionType } from "../../types/model";
import Options from "./Options";

type Prop = {
  question: QuestType;
  dispatch: React.Dispatch<ReducerActionType>;
  answer: null | number;
  points: number;
};

const Question = ({ question, dispatch, answer }: Prop) => {
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
