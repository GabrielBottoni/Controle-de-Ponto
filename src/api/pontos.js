export default async function handler(req, res) {
    const data = [
      {
        id: 1,
        name: "João",
        pontos: [
          {
            data: "2024-11-20",
            entrada: "08:00",
            saida: "17:00",
            pausa: "01:00",
          },
        ],
      },
    ];
  
    if (req.method === "GET") {
      res.status(200).json(data);
    } else if (req.method === "POST") {
      // Simula a adição de dados (você pode integrar com um banco real)
      const novoPonto = req.body;
      data[0].pontos.push(novoPonto);
      res.status(201).json({ message: "Ponto adicionado", data: novoPonto });
    } else {
      res.status(405).json({ message: "Método não permitido" });
    }
  }
  