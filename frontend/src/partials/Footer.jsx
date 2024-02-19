import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <nav className="footer__nav">
        <Link className="footer__heading" to="/">
          Todo-app
        </Link>
        <ul>
          <li>
            <Link className="footer__link" to="/faq">
              FAQ
            </Link>
          </li>
          <li>
            <Link className="footer__link" to="/about">
              About
            </Link>
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
