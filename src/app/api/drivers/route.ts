import { NextResponse } from "next/server";
import mysql from "mysql2/promise";


export async function GET() {
  try {
    console.log("Iniciando conexão com o banco de dados...");
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "desafio_pm",
    });

    console.log("Conexão bem-sucedida! Executando consulta...");
    const [rows] = await connection.execute("SELECT * FROM drivers");
    console.log("Resultados da consulta:", rows);

    await connection.end();
    console.log("Conexão fechada.");
    return NextResponse.json(rows); // Retorna os dados em JSON
  } catch (error) {
    console.error("Erro ao buscar motoristas:", error);
    return NextResponse.json(
      { error: "Erro ao buscar motoristas" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    // Lê o corpo da requisição para obter os dados do caminhão
    const { name } = await req.json();

    // Validação básica
    if (!name) {
      return NextResponse.json(
        { error: "É obrigatório colocar o nome" },
        { status: 400 }
      );
    }

    console.log("Iniciando conexão com o banco de dados...");
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "desafio_pm",
    });

    console.log("Conexão bem-sucedida! Executando consulta...");
    const query = `
      INSERT INTO drivers (name)
      VALUES (?)
    `;
    const values = [name];

    const [result] = await connection.execute(query, values);

    await connection.end();
    console.log("Conexão fechada.");

    // Retorna uma resposta com sucesso
    return NextResponse.json(
      { message: "Motorista adicionado com sucesso!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao inserir motorista:", error);
    return NextResponse.json(
      { error: "Erro ao inserir motorista" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    // Obtém o ID do caminhão a partir da URL
    const { searchParams } = new URL(req.url);
    const driverId = searchParams.get("driverID");

    // Validação do ID
    if (!driverId) {
      return NextResponse.json(
        { error: "ID do motorista é obrigatório" },
        { status: 400 }
      );
    }

    console.log("Iniciando conexão com o banco de dados...");
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "desafio_pm",
    });

    console.log("Conexão bem-sucedida! Executando consulta...");
    const query = `DELETE FROM drivers WHERE driverId = ?`;
    const values = [driverId];

    // Executando a query DELETE
    const [result] = await connection.execute(query, values);

    // Verificando se a linha foi afetada
    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { error: "Caminhão não encontrado" },
        { status: 404 }
      );
    }

    await connection.end();
    console.log("Conexão fechada.");

    // Retorna uma resposta de sucesso
    return NextResponse.json(
      { message: "Motorista excluído com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao excluir motorista:", error);
    return NextResponse.json(
      { error: "Erro ao excluir caminhão" },
      { status: 500 }
    );
  }
}
