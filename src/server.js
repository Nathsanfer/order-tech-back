import express from "express";
import { config } from "dotenv";
import cors from "cors"; // Importa o middleware CORS
import path from "path";
import { fileURLToPath } from "url";

import routes from "./routes/index.routes.js";

config(); // Carrega variáveis de ambiente do arquivo .env
const port = process.env.PORT || 4001; // Define a porta do servidor

// Inicializa o Express
const app = express();
app.use(cors()); // Habilita CORS para todas as rotas

app.use(express.json()); // Parse de JSON

// Servir arquivos estáticos de uploads (ex.: /uploads/images/arquivo.jpg)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, '..', 'public', 'uploads')));

app.use("/", routes);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`🍳 Servidor da API de Receitas rodando na porta ${port}`);
});
