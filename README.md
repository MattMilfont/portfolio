# Seja Bem-vindo

O Mojave Express Manager é um sistema feito para organizar os dados de entregas e gerenciar os caminhões e motoristas da empresa com o objetivo de facilitar o processo para a alta gestão e evitar erros de alocação de motoristas.

## Manual do Desenvolvedor

Se você está com dúvidas sobre como funciona o projeto e como configurar as dependências da aplicação, basta consultar o Manual do Desenvolvedor [clicando aqui](https://www.canva.com/design/DAGZfY9IWsE/duh26xEaepl4dCnrpr6T0w/view?utm_content=DAGZfY9IWsE&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h03849ed56b). As dúvidas quanto à estrutura do projeto podem ser visualizadas aqui.

## Manual do Usuário

Se você quer enteder o funcionamento do sistema sem a parte técnica, basta acessar o Manual do Usuário clicando aqui, faremos o máximo de simplificações para que você entenda como usar. Além do manual, você pode acessar também o tutorial aqui.

## Configurações Iniciais do Sistema

Primeiro, clone o repositório

```bash
git clone https://github.com/MattMilfont/mojave_express_manager
```

Então instale todos os requisitos do sistema

```bash
npm install next mysql2 bootstrap react react-dom bcrypt bootstrap-icons
```

## Rodando o sistema

Para rodar o sistema você precisa configurar um banco de dados MySQL. Para isso, você pode usar o arquivo .SQL no repositório para importar a estrutura que precisa.

Após isso, basta utilizar:

```bash
npm run dev
```
