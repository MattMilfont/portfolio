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
    const [rows] = await connection.execute("SELECT * FROM trucks");
    console.log("Resultados da consulta:", rows);

    await connection.end();
    console.log("Conexão fechada.");
    return NextResponse.json(rows); 
  } catch (error) {
    console.error("Erro ao buscar caminhões:", error);
    return NextResponse.json(
      { error: "Erro ao buscar caminhões" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { model } = await req.json();
    console.log(model);

    if (!model) {
      return NextResponse.json(
        { error: "É obrigatório colocar o modelo" },
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
      INSERT INTO trucks (model)
      VALUES (?)
    `;
    const values = [model];

    const [result] = await connection.execute(query, values);

    await connection.end();
    console.log("Conexão fechada.");

    return NextResponse.json(
      { message: "Caminhão adicionado com sucesso!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao inserir caminhão:", error);
    return NextResponse.json(
      { error: "Erro ao inserir caminhão" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const truckId = searchParams.get("truckID");

    if (!truckId) {
      return NextResponse.json(
        { error: "ID do caminhão é obrigatório" },
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
    const query = `DELETE FROM trucks WHERE truckID = ?`;
    const values = [truckId];

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
      { message: "Caminhão excluído com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao excluir caminhão:", error);
    return NextResponse.json(
      { error: "Erro ao excluir caminhão" },
      { status: 500 }
    );
  }
}
