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