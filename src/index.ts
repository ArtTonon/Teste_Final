import "reflect-metadata";
import { DataSource } from "typeorm";
import { Produto } from "./models/Produto";
import { User } from "./models/User";
import e, { json } from "express";
import { AuthRouter } from "./routes/AuthRouter";
import { ProdutoRouter } from "./routes/ProdutoRouter";
import cors from "cors"
import passport from "passport";
import { configurarPassport } from "./passport";
import { autenticado } from "./passport";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "1234",
  database: "usuario",
  entities: [Produto, User],
  synchronize: true,
  logging: false,
});

AppDataSource.initialize()
  .then(() => {
    console.log("iniciando banco");

    const server = e();
    const authRouter = new AuthRouter(AppDataSource);
    const produtoRouter = new ProdutoRouter(AppDataSource);

    server.use(json());
    server.use(cors({
      origin:"*", 
      credentials: true,
    }))
    server.use(passport.initialize())
    configurarPassport(AppDataSource)

    server.use("/auth", authRouter.router);
    server.use("/produtos", autenticado, produtoRouter.router);

    server.listen(3000, () => {
      console.log("rodando");
    });
  })
  .catch((error) => console.log("erro ao iniciar o banco", error));
