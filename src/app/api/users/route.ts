import { NextResponse } from "next/server";

export async function GET() {
  const users = [
    { id: "1", nome: "Alice", cpf: "123.456.789-10", senha: "senha1" },
    { id: "2", nome: "Bob", cpf: "987.654.321-00", senha: "senha2" },
  ];

  return NextResponse.json(users);
}
