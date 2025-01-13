
//Importando a livraria de sessão para utilizar a função removeSession
import { removeSession } from "@/lib/session";

//Importando o React
import React from "react";

//Declarando as propriedades de um cabeçalho
interface HeaderProps {
  title: string;
}

//Definido a estilização do header, importando as propriedade declaradas anteriormente
const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/main" style={{ color: "white" }}>
          {title}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link"
                style={{ color: "white" }}
                aria-current="page"
                href="/main"
              >
                <b>
                  <i className="bi bi-house-fill"></i> Home
                </b>
              </a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" style={{ color: "white" }} href="/trucks">
                <b>
                  <i className="bi bi-truck"></i> Caminhões
                </b>
              </a>
            </li> */}
            <li className="nav-item">
              <button
                className="nav-link"
                style={{ color: "white" }}
                onClick={() => {
                  const sessionKey = localStorage.getItem("sessionKey");
                  if (sessionKey != null) {
                    removeSession(sessionKey);
                  }
                  localStorage.removeItem("sessionKey");
                  window.location.href = "/";
                }}
              >
                <b>
                  <i className="bi bi-box-arrow-left"></i> Logout
                </b>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
