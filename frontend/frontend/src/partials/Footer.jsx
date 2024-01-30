function Footer() {
  return (
    <footer className="footer">
      <nav className="footer__nav">
        <a className="footer__heading" href="/">
          Todo-app
        </a>
        <ul>
          <li>
            <a className="footer__link" href="/faq">
              FAQ
            </a>
          </li>
          <li>
            <a className="footer__link" href="/about">
              About
            </a>
          </li>
        </ul>
      </nav>
      <p className="footer__description">
        Dołącz do osób, które osiągają wspaniałe rzeczy dzięki Todo-app.
      </p>
      <p className="footer__copyright">© KMK Inc.</p>
    </footer>
  );
}

export default Footer;
