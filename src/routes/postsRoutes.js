import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, criarPost, uploadImagem, atualizarPost } from "../controllers/postsController.js";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configura o armazenamento do Multer para uploads de imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Especifica o diretório para armazenar as imagens enviadas
    cb(null, 'upload/'); // Substitua por seu caminho de upload desejado
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo por simplicidade
    cb(null, file.originalname); // Considere usar uma estratégia de geração de nomes únicos para produção
  }
});

// Cria uma instância do middleware Multer
const upload = multer({ storage: storage });


const routes = (app) => {
  // Middleware para analisar dados JSON recebidos em requisições
  app.use(express.json());
  // Middleware que libera acesso para aplicação front-end conectar com libgram-back
  app.use(cors(corsOptions));
  // Rota para buscar todos os posts
  app.get("/posts", listarPosts);
  // Rota para criar post
  app.post("/posts", criarPost);
  // Rota para realizar upload do arquivo no diretório
  app.post("/upload", upload.single("imagem"), uploadImagem);
  // Rota para atualizar a coleção pelo ID
  app.put("/upload/:id", atualizarPost);
}

export default routes;
