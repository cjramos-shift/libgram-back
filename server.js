// Importa a biblioteca Express para criar um servidor web
import express from "express";
import routes from "./src/routes/postsRoutes.js";

// Cria uma instância da aplicação Express
const app = express();
app.use(express.static("uploads"));

routes(app);

// Inicia o servidor e escuta por requisições na porta 3000
app.listen(3000, () => {
    console.log("Servidor operante.");
});
