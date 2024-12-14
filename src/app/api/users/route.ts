import { NextResponse } from "next/server";
import mysql, { RowDataPacket } from "mysql2/promise";

class PasswordError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PasswordError";
  }
}

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
    const [rows] = await connection.execute("SELECT * FROM users");
    console.log("Resultados da consulta:", rows);

    await connection.end();
    console.log("Conexão fechada.");
    return NextResponse.json(rows); // Retorna os dados em JSON
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return NextResponse.json(
      { error: "Erro ao buscar usuários" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Dados recebidos no body:", body);

    const { email, password } = body;
    if (!email || !password) {
      console.error("Campos obrigatórios ausentes");
      return NextResponse.json(
        { error: "Campos obrigatórios: email, senha" },
        { status: 400 }
      );
    }

    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "desafio_pm",
    });

    // Busca o usuário pelo email
    const query = "SELECT * FROM users WHERE email = ?";
    const [rows] = await connection.execute<RowDataPacket[]>(query, [email]);
    await connection.end();

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const user = rows[0]; // Primeiro usuário encontrado

    if (user["password"] == password) {
      return NextResponse.json({
        message: "Login Efetuado com sucesso",
        userId: user.insertId, // OkPacket contém o campo insertId
      });
    } else {
      throw new PasswordError("Senha incorreta, tente novamente!");
    }
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    if (error instanceof PasswordError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    } else {
      return NextResponse.json(
        { error: "Erro ao criar usuário" },
        { status: 500 }
      );
    }
  }
}
