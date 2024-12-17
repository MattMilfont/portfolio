import { NextResponse } from "next/server";
import mysql, { RowDataPacket } from "mysql2/promise";
import { setSession } from "@/lib/session";

class PasswordError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PasswordError";
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
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

    const query = "SELECT * FROM users WHERE email = ?";
    const [rows] = await connection.execute<RowDataPacket[]>(query, [email]);
    await connection.end();

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const user = rows[0];

    if (user["password"] === password) {
      // Gerar uma chave de sessão
      const sessionKey = Math.random().toString(36).substr(2, 9); // Gera uma chave aleatória de 9 caracteres

      // Armazenar os dados do usuário na sessão
      const sessionData = {
        userId: user.insertId,
        email: user.email,
        username: user.username,
      };

      setSession(sessionKey, sessionData); // Armazenar a sessão no servidor

      return NextResponse.json({
        message: "Login Efetuado com sucesso",
        sessionKey, // Enviar a chave de sessão de volta para o cliente
      });
    } else {
      throw new PasswordError("Senha incorreta, tente novamente!");
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    if (error instanceof PasswordError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    } else {
      return NextResponse.json(
        { error: "Erro ao fazer login" },
        { status: 500 }
      );
    }
  }
}
