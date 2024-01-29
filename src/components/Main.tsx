import { FC, ReactNode } from "react";

interface Prop {
  children: ReactNode;
}
const Main: FC<Prop> = ({ children }) => {
  return <main className="main">{children}</main>;
};

export default Main;
