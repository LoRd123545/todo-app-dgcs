export default function Faq() {
  return (
    <>
    <h2 className="heading">Najczęściej zadawane pytania</h2>
    <ul className="faq">
      <li>
        <div className="dropdown">
          <span className="arrow dropdown__arrow"></span>
          <span className="dropdown__header">Jak mogę dodać nowe zadanie do mojej listy?</span>
        </div>
        <div className="dropdown__description">
          <p>
            Aby dodać nowe zadanie, otwórz aplikację i użyj opcji "Dodaj zadanie" lub odpowiedniego przycisku. Wprowadź tytuł zadania, opis, status oraz termin wykonania.
          </p>
        </div>
      </li>
      <li>
        <div className="dropdown">
          <span className="arrow dropdown__arrow"></span>
          <span className="dropdown__header">Czy mogę ustawić terminy wykonania dla moich zadań? Jak to zrobić?</span>
        </div>
        <div className="dropdown__description">
          <p>
            Tak, możesz ustawić termin wykonania dla zadania podczas jego dodawania lub edycji. Wybierz datę i godzinę zakończenia zadania.
          </p>
        </div>
      </li>
      <li>
        <div className="dropdown">
          <span className="arrow dropdown__arrow"></span>
          <span className="dropdown__header">Jak mogę edytować lub usuwać zadania?</span>
        </div>
        <div className="dropdown__description">
          <p>
            Aby edytować zadanie, kliknij na nie i wybierz opcję "Edytuj". Aby usunąć zadanie, użyj opcji "Usuń" dostępnej podczas przeglądania zadania.
          </p>
        </div>
      </li>
      <li>
        <div className="dropdown">
          <span className="arrow dropdown__arrow"></span>
          <span className="dropdown__header">Jak mogę oznaczyć zadanie jako zakończone?</span>
        </div>
        <div className="dropdown__description">
          <p>
            Aby oznaczyć zadanie jako zakończone zaznacz opcję "Zakończone" podczas edycji zadania.
          </p>
        </div>
      </li>
      <li>
        <div className="dropdown">
          <span className="arrow dropdown__arrow"></span>
          <span className="dropdown__header">Jakie są dostępne opcje sortowania zadań na liście?</span>
        </div>
        <div className="dropdown__description">
          <p>
            Oferujemy opcje sortowania według statusu. Możesz dostosować kolejność zadań do swoich potrzeb.
          </p>
        </div>
      </li>
      <li>
        <div className="dropdown">
          <span className="arrow dropdown__arrow"></span>
          <span className="dropdown__header">Jak mogę oznaczyć zadanie jako "Do zrobienia" oraz jako "W trakcie" czy "Zakończone"?</span>
        </div>
        <div className="dropdown__description">
          <p>
            Możesz użyć opcji statusu do oznaczenia zadań według różnych statusów, takich jak "Do zrobienia", "W trakcie" czy "Zakończone".
          </p>
        </div>
      </li>
      <li>
        <div className="dropdown">
          <span className="arrow dropdown__arrow"></span>
          <span className="dropdown__header">Czy aplikacja jest dostępna w języku polskim (lub innym)?</span>
        </div>
        <div className="dropdown__description">
          <p>
            Tak, nasza aplikacja obsługuje język polski.
          </p>
        </div>
      </li>
    </ul>
  </>
  )

}


