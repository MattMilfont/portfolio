import { NextResponse } from "next/server";
import { getSession } from "@/lib/session"; // Importa a função para obter a sessão

export async function GET(request: Request) {
  // Vamos simular que o cliente envia a chave de sessão via parâmetro de URL ou no corpo da requisição
  const url = new URL(request.url);
  const sessionKey = url.searchParams.get('sessionKey'); // Obtendo a chave de sessão

  if (!sessionKey) {
    return NextResponse.json(
      { error: "Usuário não autorizado" },
      { status: 401 }
    );
  }

  // Verificar se a sessão existe no servidor
  const session = getSession(sessionKey);

  if (!session) {
    return NextResponse.json(
      { error: "Sessão expirada ou inválida" },
      { status: 401 }
    );
  }

  // Usuário autenticado, podemos retornar informações
  return NextResponse.json({ message: "Usuário autenticado", user: session });
}
