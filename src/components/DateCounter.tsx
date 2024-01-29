import { useReducer, ChangeEvent } from "react";

const enum REDUCER_TYPE {
  INCREMENT,
  DECREMENT,
  STEP,
  COUNT,
  RESET,
}

interface ReducerActionType {
  type: REDUCER_TYPE;
  payload?: {
    step?: number;
    count?: number;
  };
}

interface InitialState {
  count: number;
  step: number;
}
// function DateCounter() {
//   const initState = { count: 0, step: 1 };

//   function reducer(
//     state: typeof initState,
//     action: ReducerActionType
//   ): typeof initState {
//     switch (action.type) {
//       case REDUCER_TYPE.INCREMENT:
//         return { ...state, count: state.count + state.step };
//       case REDUCER_TYPE.DECREMENT:
//         return { ...state, count: state.count - state.step };
//       case REDUCER_TYPE.STEP:
//         return { ...state, step: action.payload?.step ?? 1 };
//       case REDUCER_TYPE.COUNT:
//         return { ...state, count: action.payload?.count ?? 0 };
//       case REDUCER_TYPE.RESET:
//         return { ...state, step: 1, count: 0 };

//       default:
//         throw new Error("There was an error, code reached!");
//     }
//   }

//   const [state, dispatch] = useReducer(reducer, initState);

//   // This mutates the date object.
//   const date = new Date("june 21 2024");
//   date.setDate(date.getDate() + state.count);

//   const dec = function () {
//     dispatch({ type: REDUCER_TYPE.DECREMENT });
//   };

//   const inc = function () {
//     dispatch({ type: REDUCER_TYPE.INCREMENT });
//   };

//   const defineCount = function (e: ChangeEvent<HTMLInputElement>) {
//     dispatch({
//       type: REDUCER_TYPE.COUNT,
//       payload: { count: Number(e.target.value) },
//     });
//   };

//   const defineStep = function (e: ChangeEvent<HTMLInputElement>) {
//     dispatch({
//       type: REDUCER_TYPE.STEP,
//       payload: { step: Number(e.target.value) },
//     });
//   };

//   const reset = function () {
//     dispatch({ type: REDUCER_TYPE.RESET });
//   };

//   return (
//     <div className="counter">
//       <div>
//         <input
//           type="range"
//           min="0"
//           max="10"
//           onChange={defineStep}
//           value={state.step}
//         />
//         <span>{state.step}</span>
//       </div>

//       <div>
//         <button onClick={dec}>-</button>
//         <input value={state.count} onChange={defineCount} />
//         <button onClick={inc}>+</button>
//       </div>

//       <p>{date.toDateString()}</p>

//       <div>
//         <button onClick={reset}>Reset</button>
//       </div>
//     </div>
//   );
// }
function DateCounter() {
  // const initState = { count: 0, step: 1 };

  function reducer(
    state: InitialState,
    action: ReducerActionType
  ): InitialState {
    console.log(state);

    switch (action.type) {
      case REDUCER_TYPE.INCREMENT:
        return {
          ...state,
          count: state.count + state.step,
        };
      case REDUCER_TYPE.DECREMENT:
        return {
          ...state,
          count: state.count - state.step,
        };
      case REDUCER_TYPE.STEP:
        return { ...state, step: action.payload?.step ?? 1 };
      case REDUCER_TYPE.COUNT:
        return { ...state, count: action.payload?.count ?? state.count };
      case REDUCER_TYPE.RESET:
        return { step: 1, count: 0 };

      default:
        throw new Error("There was an error, code reached!");
    }
  }

  const [state, dispatch] = useReducer(reducer, { count: 0, step: 1 });

  // This mutates the date object.
  const date = new Date("june 21 2024");
  date.setDate(date.getDate() + state.count);

  const dec = function () {
    dispatch({ type: REDUCER_TYPE.DECREMENT });
  };

  const inc = function () {
    dispatch({ type: REDUCER_TYPE.INCREMENT });
  };

  const defineCount = function (e: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: REDUCER_TYPE.COUNT,
      payload: { count: Number(e.target.value) },
    });
  };

  const defineStep = function (e: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: REDUCER_TYPE.STEP,
      payload: { step: Number(e.target.value) },
    });
  };

  const reset = function () {
    dispatch({ type: REDUCER_TYPE.RESET });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="1"
          max="10"
          onChange={defineStep}
          value={state.step}
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={state.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default DateCounter;
