import fs from "fs";
import { buscarTodosPosts, salvaPost, atualizaPost } from "../models/postsModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js"

export async function listarPosts(req, res) {
  // Busca todos os posts usando a função 'buscarTodosPosts'
  const posts = await buscarTodosPosts();
  // Envia uma resposta de sucesso (código de status 200) com os dados dos posts recuperados
  res.status(200).json(posts);
}

export async function criarPost(req, res) {
  // Coleta o body da requisição (dados enviados no corpo da requisição, como título, conteúdo, etc.)
  const novoPost = req.body;

  try {
    // Chama a função 'salvaPost' para persistir o novo post no banco de dados
    const postCriado = await salvaPost(novoPost);
    // Retorna uma resposta HTTP com status 200 (sucesso) e os dados do post criado
    res.status(200).json(postCriado);
  } catch (erro) {
    // Captura qualquer erro que possa ocorrer durante a criação do post
    console.error(erro.message); // Loga o erro no console para facilitar a depuração
    // Retorna uma resposta HTTP com status 500 (erro interno do servidor) e uma mensagem de erro genérica
    res.status(500).json({ "Erro": "Falha ao publicar o post." });
  }
}

export async function uploadImagem(req, res) {
  // Cria um objeto representando o novo post, com base nos dados do arquivo enviado
  const novoPost = {
    descricao: "", // Descrição do post 
    imgUrl: req.file.originalname, // Nome original do arquivo enviado
    alt: "" // Texto alternativo para a imagem 
  };

  try {
    // Chama a função 'salvaPost' para persistir o novo post no banco de dados
    const postCriado = await salvaPost(novoPost);
    // Constrói o novo caminho completo para a imagem, utilizando o ID do post criado
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
    // Renomeia o arquivo enviado para o novo caminho
    fs.renameSync(req.file.path, imagemAtualizada)
    // Retorna uma resposta HTTP com status 200 (sucesso) e os dados do post criado
    res.status(200).json(postCriado);
  } catch (erro) {
    // Captura qualquer erro que possa ocorrer durante o upload e salvamento da imagem
    console.error(erro.message);
    // Retorna uma resposta HTTP com status 500 (erro interno do servidor) e uma mensagem de erro genérica
    res.status(500).json({ "Erro": "Falha na requisição" })
  }
}

export async function atualizarPost(req, res) {
  const id = req.params.id;
  const urlImg = `http://localhost:3000/${id}.png`;

  try {
    const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
    const descricao = await gerarDescricaoComGemini(imageBuffer);

    const post = {
      imgUrl: urlImg,
      descricao: descricao,
      alt: req.body.alt
    }

    const postAtualizado = await atualizaPost(id, post);

    res.status(200).json(postAtualizado);
  } catch (erro) {
    console.error(erro.message); // Loga o erro no console para facilitar a depuração

    res.status(500).json({ "Erro": "Falha ao publicar o post." });
  }
}