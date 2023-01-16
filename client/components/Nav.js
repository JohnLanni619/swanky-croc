import { Link } from "react-router-dom";
import logo from '../assets/LogoNW.png';

export default function Nav() {
  return (
    <header>
      <img src={logo} alt="logo" className="logo" />
      <h1>The GameDB</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/games">Games</Link>
        <Link to="/profile">User Profile</Link>
      </nav>
    </header>
  );
}
