// Usando a renderização da página toda no cliente
"use client";

import Header from "@/components/header";

export default function ExperienciasPage() {
  return (
    <div>
      <Header page="/experiencias"></Header>
      <div className="container-fluid">
        <div className="row">
          <div className="col-10 offset-1 mt-5">
            <div className="accordion accordion-dark" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#policiaMilitar"
                    aria-expanded="true"
                    aria-controls="policiaMilitar"
                    style={{ backgroundColor: "#212529", color: "white" }}
                  >
                    2025 - Polícia Militar do Ceará
                  </button>
                </h2>
                <div
                  id="policiaMilitar"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                  style={{ backgroundColor: "#212529", color: "white" }}
                >
                  <div className="accordion-body bg-dark text-white">
                    Esta é minha posição atual e hoje atuo como desenvolvedor full-stack pleno em NextJS, Vite e NestJS. Como programador na
                     Polícia Militar do Ceará tenho atribuições fundamentais nas execuções das tarefas de segurança pública devido a automatização dos 
                     processos via sistemas web. Nessa experiência consegui colocar em prática diversas áreas do conhecimento, como desenvolvimento de APIs 
                     REST usando NodeJS, Modelagem de Dados, Prototipagem de Sistemas e desenvolvimento Front-end usando React. Também pude lidar com sistema legado 
                     em PHP que utilizam CodeIgniter, colocando em prática minha experiência com PHP aplicado em sistemas robustos.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                    style={{ backgroundColor: "#212529", color: "white" }}
                  >
                    2024 - Secretaria de Segurança Pública e Defesa
                    Social
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body bg-dark text-white">
                    <strong>This is the second item's accordion body.</strong>{" "}
                    It is hidden by default, until the collapse plugin adds the
                    appropriate classes that we use to style each element. These
                    classes control the overall appearance, as well as the
                    showing and hiding via CSS transitions. You can modify any
                    of this with custom CSS or overriding our default variables.
                    It's also worth noting that just about any HTML can go
                    within the <code>.accordion-body</code>, though the
                    transition does limit overflow.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                    style={{ backgroundColor: "#212529", color: "white" }}
                  >
                    2023 - Radix Engenharia e Software
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body bg-dark text-white">
                    <strong>This is the third item's accordion body.</strong> It
                    is hidden by default, until the collapse plugin adds the
                    appropriate classes that we use to style each element. These
                    classes control the overall appearance, as well as the
                    showing and hiding via CSS transitions. You can modify any
                    of this with custom CSS or overriding our default variables.
                    It's also worth noting that just about any HTML can go
                    within the <code>.accordion-body</code>, though the
                    transition does limit overflow.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFour">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                    style={{ backgroundColor: "#212529", color: "white" }}
                  >
                    2022 - Academia Estadual de Segurança Pública
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFour"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body bg-dark text-white">
                    <strong>This is the third item's accordion body.</strong> It
                    is hidden by default, until the collapse plugin adds the
                    appropriate classes that we use to style each element. These
                    classes control the overall appearance, as well as the
                    showing and hiding via CSS transitions. You can modify any
                    of this with custom CSS or overriding our default variables.
                    It's also worth noting that just about any HTML can go
                    within the <code>.accordion-body</code>, though the
                    transition does limit overflow.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
