import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function gerarDescricaoComGemini(imageBuffer) {
    // Define uma função assíncrona chamada 'gerarDescricaoComGemini' que recebe um buffer de imagem como entrada.
    const prompt =
      "Gere apenas uma descrição em português do brasil para a seguinte imagem, sem a necessidade de formalidades, apenas o texto de descrição.";
    // Cria um prompt padrão para o modelo Gemini, solicitando uma descrição em português da imagem.
  
    try {
      // Inicia um bloco try-catch para tratar possíveis erros.
      const image = {
        inlineData: {
          data: imageBuffer.toString("base64"), // 4. Converte o buffer de imagem para uma string base64.
          mimeType: "image/png", // 5. Define o tipo MIME da imagem como PNG.
        },
      };
      // Cria um objeto que representa a imagem, incluindo os dados em base64 e o tipo MIME.
      const res = await model.generateContent([prompt, image]);
      // Chama o modelo Gemini com o prompt e a imagem, aguardando a resposta.
      return res.response.text() || "Alt-text não disponível.";
      // Extrai o texto da resposta do modelo e o retorna. Se não houver texto, retorna uma mensagem padrão.
    } catch (erro) {
      // Captura qualquer erro que possa ocorrer durante a execução.
      console.error("Erro ao obter alt-text:", erro.message, erro); // 10. Imprime uma mensagem de erro no console.
      throw new Error("Erro ao obter o alt-text do Gemini."); // 11. Lança uma nova exceção para indicar que ocorreu um erro.
    }
  }
  