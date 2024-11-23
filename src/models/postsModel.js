// Importa a função para conectar ao banco de dados de um arquivo separado
import { ObjectId } from "mongodb";
import 'dotenv/config';
import conectarAoBanco from "../config/dbConfig.js";

// Estabelece uma conexão com o banco de dados usando a função importada e a string de conexão
// armazenada na variável de ambiente CONNECTION_STRING
const conexao = await conectarAoBanco(process.env.CONNECTION_STRING);

// Função assíncrona para buscar todos os posts do banco de dados
export async function buscarTodosPosts() {
    // Acessa o banco de dados a partir da conexão estabelecida
    const db = conexao.db("imersao-libgram");

    // Obtém a coleção chamada "posts" do banco de dados
    const colecao = db.collection("posts");

    // Usa o método 'find' para recuperar todos os documentos e convertê-los em um array
    return colecao.find().toArray();
}

export async function salvaPost(body) {
    const db = conexao.db("imersao-libgram");
    const colecao = db.collection("posts");
    // Insere na coleção no Mongo
    return colecao.insertOne(body);
}

export async function atualizaPost(id, body) {
    const db = conexao.db("imersao-libgram");
    const colecao = db.collection("posts");
    const objectId = ObjectId.createFromHexString(id);
    // Atualiza na coleção no Mongo
    return colecao.updateOne({ _id: new ObjectId(objectId) }, { $set: body });
}