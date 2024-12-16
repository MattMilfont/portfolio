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
    return NextResponse.json(rows);
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
    const { name } = await req.json();
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
    const { searchParams } = new URL(req.url);
    const driverId = searchParams.get("driverID");

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

    const [result] = await connection.execute(query, values);

    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { error: "Caminhão não encontrado" },
        { status: 404 }
      );
    }

    await connection.end();
    console.log("Conexão fechada.");

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
