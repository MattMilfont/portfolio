// Usando a renderização da página toda no cliente
"use client";

import Header from "@/components/header";

export default function MainPage() {
  return (
    <div>
      <Header page="/main"></Header>
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-12 text-center">
            <img
              src="/assets/main.jpg"
              alt="Foto de perfil"
              className="rounded-circle"
              style={{ width: "300px", height: "300px" }}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-8 offset-2 text-center">
            <p className="text-light" style={{ fontSize: 20 }}>
              <b>Matheus Milfont</b>
            </p>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-8 offset-2">
            <div
              className="card bg-dark"
              style={{ boxShadow: "0px 10px 30px rgba(255, 255, 255, 0.1)" }}
            >
              <div className="card-body">
                <p className="text-light">
                  Oi, tudo bem? Meu nome é Matheus Milfont. Sou um desenvolvedor
                  Full Stack com mais de 3 anos de experiência, especializado na
                  criação de aplicações web escaláveis e eficientes. Com domínio
                  em front-end e back-end, utilizo tecnologias modernas para
                  desenvolver soluções robustas, intuitivas e de alto
                  desempenho. Tenho experiência em frameworks como Next.js e
                  Flutter, além de trabalhar com bancos de dados, APIs e
                  infraestrutura. Meu foco é transformar ideias em produtos
                  funcionais, garantindo qualidade e usabilidade em cada
                  projeto.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4 mb-5">
          <div className="col-5 offset-1 text-center">
            <div className="row">
              <div className="col-12">
                <p className="text-light" style={{ fontSize: 20 }}>
                  <b>Linguagens</b>
                </p>
              </div>
            </div>
            <div className="row text-center mt-5">
              <div className="col-4 mt-4">
                <img src="/assets/php.svg" width={75} />
              </div>
              <div className="col-4">
                <img src="/assets/js.svg" width={75} />
              </div>
              <div className="col-4 mt-2">
                <img src="/assets/ts.svg" width={60} />
              </div>
            </div>
            <div className="row text-center mt-5">
              <div className="col-4 mt-2">
                <img src="/assets/python.svg" width={50} />
              </div>
              <div className="col-4 mt-4">
                <img src="/assets/java.svg" width={75} />
              </div>
              <div className="col-4 mt-2">
                <img src="/assets/dart.svg" width={75} />
              </div>
            </div>
          </div>
          <div className="col-5 text-center">
            <div className="row">
              <div className="col-12">
                <p className="text-light" style={{ fontSize: 20 }}>
                  <b>Frameworks</b>
                </p>
              </div>
            </div>
            <div className="row text-center mt-5">
              <div className="col-4 mt-1">
                <img src="/assets/nest.svg" width={75} />
              </div>
              <div className="col-4">
                <img src="/assets/next.svg" width={75} />
              </div>
              <div className="col-4 mt-2">
                <img src="/assets/flutter.svg" width={60} />
              </div>
            </div>
            <div className="row text-center mt-5">
              <div className="col-4 mt-2">
                <img src="/assets/fastapi.svg" width={75} />
              </div>
              <div className="col-4 mt-2">
                <img src="/assets/react.svg" width={60} />
              </div>
              <div className="col-4 mt-3">
                <img src="/assets/codeigniter.svg" width={60} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
