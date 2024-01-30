function Header() {
  return (
    <header className="header">
      <nav className="header__nav">
        <a className="header__heading" href="/">
          Todo-app
        </a>
        <ul>
          <li>
            <a className="header__link" href="/faq">
              FAQ
            </a>
          </li>
          <li>
            <a className="header__link" href="/about">
              About
            </a>
          </li>
          <li>
            <a className="header__link" href="/tasks">
              Zadania
            </a>
          </li>
          <li>
            <a className="header__link" href="/account">
              Konto
            </a>
          </li>
          <li>
            <a className="header__link" href="/logout">
              Wyloguj się
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
