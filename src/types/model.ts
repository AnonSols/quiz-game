import React from "react";

export const enum REDUCER_TYPE {
  DATA_RECIEVED,
  DATA_ERROR,
  DATA_ACTIVE,
  DATA_FINISHED,
  ANSWER,
  NEXT,
  RESTART,
  TIMER,
  SECS_PER_QUESTION = 10,
  USERSNAME,
}

export type StateProp = {
  question: QuestType[];
  index: number;
  answer: null | number;
  status: string;
  highscore: number;
  points: number;
  secondsRemaing: number;
  userTime?: number;
  name: string | undefined;
};

export type QuestType = {
  correctOption: number;
  id: string;
  options: [string, string, string, string];
  points: number;
  question: string;
};

export interface ReducerActionType {
  type: REDUCER_TYPE;
  payload?: {
    question?: QuestType[];
    answer?: number;
    error?: string;
    points?: number;
    event?: React.ChangeEvent<HTMLInputElement>;
  };
}
