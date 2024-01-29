import { useReducer } from "react";

const enum REDUCERTYPE {
  OPENACCOUNT,
  DEPOSIT,
  WITHDRAW,
  REQUESTLOAN,
  PAYLOAN,
  CLOSEACCOUNT,
}

type ReducerAction = {
  type: REDUCERTYPE;
};
const Bank = () => {
  const InitialState = {
    balance: 0,
    loan: 0,
    open: false,
    status: "close",
  };

  function reducer(
    state: typeof InitialState,
    action: ReducerAction
  ): typeof InitialState {
    switch (action.type) {
      case REDUCERTYPE.OPENACCOUNT:
        return { ...state, balance: 500, loan: 0, open: true, status: "open" };
      case REDUCERTYPE.CLOSEACCOUNT:
        if (state.loan > 0 || state.balance !== 0) return state;
        return InitialState;
      case REDUCERTYPE.DEPOSIT:
        return { ...state, balance: state.balance + 150 };
      case REDUCERTYPE.WITHDRAW:
        return { ...state, balance: state.balance - 50 };
      case REDUCERTYPE.REQUESTLOAN:
        return { ...state, loan: state.loan === 0 ? 5000 : state.loan };
      case REDUCERTYPE.PAYLOAN:
        return { ...state, loan: state.loan === 5000 ? 0 : state.loan };
      default:
        throw new Error("This code is never to be reached");
    }
  }

  const [{ balance, loan, open }, dispatch] = useReducer(reducer, InitialState);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "20px",
        fontWeight: "bolder",
      }}
    >
      {" "}
      <h1>useReducers Banks</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>
      <button
        disabled={open === true}
        onClick={() => dispatch({ type: REDUCERTYPE.OPENACCOUNT })}
      >
        Open Account
      </button>
      <button
        disabled={open !== true}
        onClick={() => dispatch({ type: REDUCERTYPE.DEPOSIT })}
      >
        Deposit 150
      </button>
      <button
        disabled={open !== true}
        onClick={() => dispatch({ type: REDUCERTYPE.WITHDRAW })}
      >
        Withdraw 50
      </button>
      <button
        disabled={open !== true}
        onClick={() => dispatch({ type: REDUCERTYPE.REQUESTLOAN })}
      >
        Request a loan of 5000
      </button>
      <button
        disabled={open !== true}
        onClick={() => dispatch({ type: REDUCERTYPE.PAYLOAN })}
      >
        Pay loan
      </button>
      <button
        disabled={open !== true}
        onClick={() => dispatch({ type: REDUCERTYPE.CLOSEACCOUNT })}
      >
        Close account
      </button>
    </div>
  );
};

export default Bank;
