import Header from "@/components/header";

export default function ExperienciasPage() {
  return (
    <div>
      <Header page="/projetos"></Header>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 offset-md-2 mt-5">
            <div
              className="card bg-dark"
              style={{ boxShadow: "0px 10px 30px rgba(255, 255, 255, 0.1)" }}
            >
              <img
                src="/assets/aesp_logo.png"
                className="card-img-top"
                height={100}
              />
              <div className="card-body">
                <h5 className="text-white">Sistema de Gestão Acadêmica</h5>
                <p className="text-white">
                  Um sistema de gerenciamento completo que centraliza e
                  automatiza os processos internos de divisão de turmas,
                  instrutores, cursos e alunos, além do pagamento das
                  horas-aulas dos profissionais educadores da Academia Estadual
                  de Segurança Pública do Ceará (AESP-CE).
                </p>
                <a
                  href="http://sistemas.aesp.ce.gov.br/sga/"
                  className="btn btn-warning"
                >
                  Acessar Projeto
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-5">
            <div
              className="card bg-dark"
              style={{ boxShadow: "0px 10px 30px rgba(255, 255, 255, 0.1)" }}
            >
              <img
                src="/assets/aesp_logo.png"
                className="card-img-top"
                height={100}
              />
              <div className="card-body">
                <h5 className="text-white">Amigos do CCDS</h5>
                <p className="text-white">
                  Um aplicativo IOS e Android que integra os Conselhos
                  Comunitários de Defesa Social e serve como um polo de conexão
                  entre os líderes do movimento do CCDS e os colaboradores da
                  Secretaria de Segurança Pública e Defesa Social.
                </p>
                <a
                  href="http://sistemas.aesp.ce.gov.br/sga/"
                  className="btn btn-warning"
                >
                  Acessar Projeto
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 offset-md-2 mt-5">
            <div
              className="card bg-dark"
              style={{ boxShadow: "0px 10px 30px rgba(255, 255, 255, 0.1)" }}
            >
              <img
                src="/assets/aesp_logo.png"
                className="card-img-top"
                height={100}
              />
              <div className="card-body">
                <h5 className="text-white">
                  Sistema de Gestão da Educação Física
                </h5>
                <p className="text-white">
                  Esse sistema tem como objetivo gerenciar os Teste de Aptidão
                  Física e Provas da Polícia Militar e agregados que podem vir a
                  utilizar os conceitos desenvolvidos nele. O sistema é capaz de
                  dividir os candidatos do teste, calcular parâmetros e definir
                  resultados.
                </p>
                <a
                  href="http://sistemas.aesp.ce.gov.br/sga/"
                  className="btn btn-warning"
                >
                  Acessar Projeto
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-5">
            <div
              className="card bg-dark"
              style={{ boxShadow: "0px 10px 30px rgba(255, 255, 255, 0.1)" }}
            >
              <img
                src="/assets/aesp_logo.png"
                className="card-img-top"
                height={100}
              />
              <div className="card-body">
                <h5 className="text-white">Conjunto Habitacional</h5>
                <p className="text-white">
                  Um aplicativo IOS e Android utilizado pelos Policiais
                  Militares para gerenciar e mapear os moradores dos conjuntos
                  habitacionais de Fortaleza, visando combater as desabitações e
                  controlar o fluxo de pessoas dentro dos pontos críticos de
                  violência da capital.
                </p>
                <a
                  href="http://sistemas.aesp.ce.gov.br/sga/"
                  className="btn btn-warning"
                >
                  Acessar Projeto
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 offset-md-4 mt-5">
            <div
              className="card bg-dark"
              style={{ boxShadow: "0px 10px 30px rgba(255, 255, 255, 0.1)" }}
            >
              <img
                src="/assets/aesp_logo.png"
                className="card-img-top"
                height={100}
              />
              <div className="card-body">
                <h5 className="text-white">E-Justiça</h5>
                <p className="text-white">
                  Esse sistema foi desenvolvido para facilitar a integração
                  entre a Polícia Militar e a Justiça do Estado do Ceará,
                  trabalhando os dados para facilitar a requisição de policiais
                  para contribuir com as audiências e testemunhos nos processos
                  oriundos das ações militares.
                </p>
                <a
                  href="http://sistemas.aesp.ce.gov.br/sga/"
                  className="btn btn-warning"
                >
                  Acessar Projeto
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
