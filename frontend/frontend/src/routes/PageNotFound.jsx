import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="container container--flex">
      <div
        className="container__panel--image container--shadow"
        style={{
          backgroundImage: `url(../public/images/PageNotFoundBackground.png)`,
        }}
      >
        <div className="container__panel--green">
          <h1 className="heading heading--big text--white text--shadow">404</h1>
          <h3 className="heading heading--medium text--white text--shadow">
            Ups!
          </h3>
          <p className="text--white text--shadow panel__paragraph paragraph--big panel__paragraph--margin">
            Strona wydostała się z internetowej rzeczywistości i udała się na
            wakacje do krainy fantazji. Nie martw się, wróci, jak tylko skończy
            zwiedzać.
          </p>
          <div className="button__panel">
            <Link to="/" className="button--not-found">
              Chcę wrócić!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
