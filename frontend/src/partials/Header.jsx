import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <nav className="header__nav">
        <Link className="header__heading" to="/">
          Todo-app
        </Link>
        <ul>
          <li>
            <Link className="header__link" to="/faq">
              FAQ
            </Link>
          </li>
          <li>
            <Link className="header__link" to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="header__link" to="/tasks">
              Zadania
            </Link>
          </li>
          <li>
            <Link className="header__link" to="/account">
              Konto
            </Link>
          </li>
          <li>
            <Link className="header__link" to="/logout">
              Wyloguj się
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
