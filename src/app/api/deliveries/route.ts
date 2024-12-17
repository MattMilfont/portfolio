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
        "SELECT deliveries.deliveryID, deliveries.destination, deliveries.secure, deliveries.arrivalDate, deliveries.type, deliveries.value, trucks.truckID, trucks.model, drivers.driverID, drivers.name FROM deliveries INNER JOIN trucks ON deliveries.truckID = trucks.truckID INNER JOIN drivers ON deliveries.driverID = drivers.driverID"
    );
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

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const deliveryID = searchParams.get("deliveryID");

    if (!deliveryID) {
      return NextResponse.json(
        { error: "ID da entrega é obrigatório" },
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
    const query = `DELETE FROM deliveries WHERE deliveryID = ?`;
    const values = [deliveryID];

    const [result] = await connection.execute(query, values);

    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { error: "Entrega não encontrada" },
        { status: 404 }
      );
    }

    await connection.end();
    console.log("Conexão fechada.");

    return NextResponse.json(
      { message: "Entrega excluída com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao excluir entrega:", error);
    return NextResponse.json(
      { error: "Erro ao excluir entrega" },
      { status: 500 }
    );
  }
}


export async function POST(req: Request) {
  try {
    const { destination, arrivalDate, type, truckID, driverID, value, secure } =
      await req.json();

    console.log("Dados recebidos na requisição:", {
      destination,
      arrivalDate,
      type,
      truckID,
      driverID,
      value,
      secure,
    });

    if (
      !driverID ||
      !truckID ||
      !arrivalDate ||
      !type ||
      !destination ||
      !value
    ) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios." },
        { status: 400 }
      );
    }

    const today = new Date();
    const departureDate = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    const arrival = new Date(arrivalDate);
    const departure = new Date(departureDate);

    if (arrival < departure) {
      return NextResponse.json(
        { error: "A data de chegada não pode ser menor que a data de saída." },
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

    console.log("Conexão bem-sucedida! Executando consultas...");

    // Corrigindo a consulta e os parâmetros
    const [truckDeliveries] = await connection.execute(
      `
      SELECT * FROM deliveries
      WHERE truckID = ? AND (
        (departureDate <= ? AND arrivalDate >= ?)
      )
    `,
      [
        truckID,
        departureDate, // parâmetro para verificar overlap
        arrivalDate, // parâmetro para verificar overlap
      ]
    );

    if (Array.isArray(truckDeliveries) && truckDeliveries.length > 0) {
      await connection.end();
      return NextResponse.json(
        { error: "O caminhão já está em outra entrega nesse período." },
        { status: 400 }
      );
    }

    const [truckDeliveriesCount] = await connection.execute(
      `
      SELECT COUNT(*) AS deliveryCount FROM deliveries
      WHERE truckID = ? AND arrivalDate LIKE ?
    `,
      [truckID, `${departureDate.slice(0, 7)}%`]
    );

    if (Array.isArray(truckDeliveriesCount) && truckDeliveriesCount[0]) {
      const count = (truckDeliveriesCount[0] as any).deliveryCount;
      if (count >= 4) {
        await connection.end();
        return NextResponse.json(
          { error: "O caminhão já fez 4 entregas neste mês." },
          { status: 400 }
        );
      }
    }

    const [driverDeliveries] = await connection.execute(
      `
      SELECT * FROM deliveries
      WHERE driverID = ? AND departureDate = ?
    `,
      [driverID, departureDate]
    );

    if (Array.isArray(driverDeliveries) && driverDeliveries.length > 0) {
      await connection.end();
      return NextResponse.json(
        {
          error:
            "O motorista já está alocado em outra entrega na data de saída.",
        },
        { status: 400 }
      );
    }

    const [driverDeliveriesForNordeste] = await connection.execute(
      `
      SELECT * FROM deliveries
      WHERE driverID = ? AND destination = 'Nordeste' AND arrivalDate LIKE ?
    `,
      [driverID, `${departureDate.slice(0, 7)}%`]
    );

    if (
      destination === "Nordeste" &&
      Array.isArray(driverDeliveriesForNordeste) &&
      driverDeliveriesForNordeste.length > 0
    ) {
      await connection.end();
      return NextResponse.json(
        { error: "O motorista já fez uma entrega para o Nordeste neste mês." },
        { status: 400 }
      );
    }

    const query = `
      INSERT INTO deliveries (driverID, truckID, departureDate, arrivalDate, type, destination, value, secure)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    let correctedValue = value;

    if (destination === "Amazônia") {
      correctedValue = correctedValue * 1.2;
    } else if (destination === "Argentina") {
      correctedValue = correctedValue * 1.4;
    } else if (destination === "Nordeste") {
      correctedValue = correctedValue * 1.3;
    }

    const values = [
      driverID,
      truckID,
      departureDate,
      arrivalDate,
      type,
      destination,
      correctedValue,
      secure,
    ];

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

export async function PUT(req: Request) {
  try {
    const { deliveryID, arrivalDate } = await req.json();

    console.log("Dados recebidos para atualização:", {
      deliveryID,
      arrivalDate,
    });

    if (!deliveryID || !arrivalDate) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios." },
        { status: 400 }
      );
    }

    const currentDate = new Date();
    const arrival = new Date(arrivalDate);

    if (arrival <= currentDate) {
      return NextResponse.json(
        { error: "A data de chegada deve ser posterior à data atual." },
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

    console.log("Conexão bem-sucedida! Atualizando dados...");

    const query = `
      UPDATE deliveries
      SET arrivalDate = ?
      WHERE deliveryID = ?
    `;

    const values = [arrivalDate, deliveryID];

    const [result] = await connection.execute(query, values);

    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { error: "Entrega não encontrada." },
        { status: 404 }
      );
    }

    await connection.end();
    console.log("Atualização realizada com sucesso.");

    return NextResponse.json(
      { message: "Entrega atualizada com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao atualizar entrega:", error);

    return NextResponse.json(
      { error: "Erro ao atualizar entrega." },
      { status: 500 }
    );
  }
}
