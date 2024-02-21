export default function About() {
  return (
    <>
      <div className="panel--flex">
        <div className="panel__box--left">
          <span className="panel__text--upper">O Naszej Aplikacji</span>
          <h1 className="panel__heading">
            Witaj na oficjalnej stronie aplikacji 
            <span className="panel__text--color-green">Todo-app</span>
          </h1>
          <p className="panel__paragraph panel__paragraph--align-left">
            innowacyjnego narzędzia stworzonego z myślą o usprawnianiu Twojego codziennego życia 
            poprzez efektywne zarządzanie obowiązkami. Jesteśmy zespołem, który połączył swoje umiejętności, aby dostarczyć 
            Ci narzędzie, które nie tylko ułatwi, ale także przekroczy Twoje oczekiwania w zarządzaniu zadaniowym.
          </p>
        </div>
        <div className="panel__image">
          <img className="panel__image--round" src="../public/images/about-background.png" alt="person writing on a computer" width="600" height="400"></img>
        </div>
      </div>
      <div className="panel panel--margin">
        <span className="panel__text--upper">Nasza misja</span>
        <h1 className="panel__heading">Chcemy, abyś mógł skoncentrować się na osiąganiu celów</h1>
        <p className="panel__paragraph">
          Celem Todo-app jest dostarczenie użytkownikom prostego, intuicyjnego i wszechstronnego narzędzia do efektywnego planowania i śledzenia ich zadań. 
          Chcemy, abyś mógł skoncentrować się na osiąganiu celów, a my zajmiemy się resztą, zapewniając klarowność i porządek w Twoich obowiązkach.
        </p>
      </div>
      <div className="panel--flex panel__image">
          <img className="panel__image--round" src="../public/images/about-background-2.png" alt="people fist bumping each other" width="600" height="400"></img>
      </div>
      <div className="panel panel--margin">
        <span className="panel__text--upper">Nasza wizja</span>
        <h1 className="panel__heading">Skupieni na Twoim Sukcesie z Todo-app</h1>
        <p className="panel__paragraph">
          W Todo-app pragniemy ułatwić codzienne życie poprzez efektywne zarządzanie obowiązkami. Naszym celem jest inspirowanie użytkowników 
          do osiągania sukcesów, tworząc narzędzie, które nie tylko ułatwia planowanie, ale także dostarcza satysfakcji i wsparcia społecznościowego. 
          Chcemy być nie tylko aplikacją do zarządzania zadaniami, ale także partnerem w drodze do efektywności i spełnionego życia.
        </p>
      </div>
    </>
  )
}