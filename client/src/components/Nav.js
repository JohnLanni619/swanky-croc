import { Link } from "react-router-dom";
import { GiConsoleController } from "react-icons/gi";

export default function Nav() {
  return (
    <header>
      <GiConsoleController className="logo" />
      <h1>GameDB</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/games">Games</Link>
      </nav>
    </header>
  );
}
