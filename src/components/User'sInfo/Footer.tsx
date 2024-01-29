import Info from "./Info";

type prop = {
  children: React.ReactNode;
  username: string | undefined;
  points: number;
};
const Footer = ({ children, username, points }: prop) => {
  return (
    <footer className="footer">
      <div style={{ width: "100%", marginBottom: "4px" }}>{children}</div>

      <div style={{ marginTop: "10px" }}>
        <Info>
          <div className=" info">
            <p>🔭 {username}</p>
            <p>🎈 {points} points</p>
          </div>
        </Info>
      </div>
    </footer>
  );
};

export default Footer;
