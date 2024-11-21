import { buscarTodosPosts } from "../models/postsModel.js";

export async function listarPosts(req, res) {
    // Busca todos os posts usando a função 'buscarTodosPosts'
    const posts = await buscarTodosPosts();
    // Envia uma resposta de sucesso (código de status 200) com os dados dos posts recuperados
    res.status(200).json(posts);
}
