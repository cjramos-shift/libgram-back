// Importa a função para conectar ao banco de dados de um arquivo separado
import conectarAoBanco from "../config/dbConfig.js";

// Estabelece uma conexão com o banco de dados usando a função importada e a string de conexão
// armazenada na variável de ambiente CONNECTION_STRING
const conexao = await conectarAoBanco(process.env.CONNECTION_STRING);

// Função assíncrona para buscar todos os posts do banco de dados
export async function buscarTodosPosts() {
    // Acessa o banco de dados a partir da conexão estabelecida
    const db = conexao.db("imersao-libgram");

    // Obtém a coleção chamada "posts" do banco de dados
    const colexao = db.collection("posts");

    // Usa o método 'find' para recuperar todos os documentos e convertê-los em um array
    return colexao.find().toArray();
}