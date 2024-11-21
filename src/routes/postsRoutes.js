import express from "express";
import { listarPosts } from "../controllers/postsController.js";

const routes = (app) => {
    // Middleware para analisar dados JSON recebidos em requisições
    app.use(express.json());

    // Manipulador de rota para requisições GET no endpoint "/posts"
    app.get("/posts", listarPosts);
}

export default routes;
