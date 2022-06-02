import {Link} from 'react-router-dom';

export default function Nav() {
    return (
        <header>
            <img className="logo" src="" alt="" />
            <h1>Title</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/games">Games</Link>
            </nav>
        </header>
    )
};