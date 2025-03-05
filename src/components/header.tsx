// Importando o React
import React from "react";

// Declarando as propriedades de um cabeçalho
interface HeaderProps {
  page: string;
}

// Definindo a estilização do header, importando as propriedades declaradas anteriormente
const Header: React.FC<HeaderProps> = ({ page }) => {
  // Função para verificar se o link é o da página atual
  const isActive = (link: string) =>
    link === page ? "nav-link active" : "nav-link text-light";

  return (
    <div className="container-fluid">
      <div className="row mt-4">
        <div className="col-12 d-flex justify-content-center">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <a
                className={isActive("/main")}
                style={{ backgroundColor: page === "/main" ? "green" : "" }}
                aria-current="page"
                href="/"
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className={isActive("/projetos")}
                href="/projetos"
                style={{ backgroundColor: page === "/projetos" ? "green" : "" }}
              >
                Projetos
              </a>
            </li>
            <li className="nav-item">
              <a
                className={isActive("/experiencias")}
                href="/experiencias"
                style={{
                  backgroundColor: page === "/experiencias" ? "green" : "",
                }}
              >
                Experiências
              </a>
            </li>
            <li className="nav-item">
              <a
                className={isActive("/contato")}
                href="/contato"
                style={{ backgroundColor: page === "/contato" ? "green" : "" }}
              >
                Contato
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
