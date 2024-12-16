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
    const [rows] = await connection.execute(
        "SELECT deliveries.deliveryID, deliveries.destination, deliveries.arrivalDate, deliveries.type, deliveries.value, trucks.truckID, trucks.model, drivers.driverID, drivers.name FROM deliveries INNER JOIN trucks ON deliveries.truckID = trucks.truckID INNER JOIN drivers ON deliveries.driverID = drivers.driverID"
    );
    console.log("Resultados da consulta:", rows);

    await connection.end();
    console.log("Conexão fechada.");
    return NextResponse.json(rows); // Retorna os dados em JSON
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
    // Recebendo os dados da requisição
    const { destination, arrivalDate, type, truckID, driverID, value } = await req.json();

    // Imprimindo os dados recebidos na requisição
    console.log("Dados recebidos na requisição:", {
      destination,
      arrivalDate,
      type,
      truckID,
      driverID,
      value,
    });

    if ( !driverID || !truckID|| !arrivalDate || !type  || !destination || !value) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios." },
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
      INSERT INTO deliveries (driverID, truckID, departureDate, arrivalDate, type, destination, value)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    let correctedValue = value;

    if (destination === "Amazônia") {
      correctedValue = correctedValue * 1.2;
    } else if (destination === "Argentina") {
      correctedValue = correctedValue * 1.4;
    } else if (destination === "Nordeste") {
      correctedValue = correctedValue * 1.3;
    }

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Mês começa em 0, então adiciona 1
    const day = String(today.getDate()).padStart(2, '0'); // Adiciona 0 à esquerda se o dia for menor que 10

    const departureDate = `${year}-${month}-${day}`;

    const values = [ driverID, truckID, departureDate, arrivalDate, type, destination, correctedValue];

    const [result] = await connection.execute(query, values);

    console.log("Inserção realizada com sucesso:", result);

    await connection.end();
    console.log("Conexão fechada.");

    return NextResponse.json(
      { message: "Entrega adicionada com sucesso!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao inserir entrega:", error);

    return NextResponse.json(
      { error: "Erro ao inserir entrega." },
      { status: 500 }
    );
  }
}

