import express, {json} from "express";
import cors from "cors";
import authRouter from "./routes/AuthRoutes.js";

const server = express();
const PORT = 5000;

server.use(json());
server.use(cors());

server.use(authRouter);

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
});