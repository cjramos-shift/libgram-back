import express from "express";

const app = express();
app.listen(3000, () => {
    console.log("Servidor operante.");
});

const posts = [
    {
        id: 1,
        descricao: "Foto teste",
        imagem: "https://http.cat/images/200.jpg"
    },
    {
        id: 2,
        descricao: "Gato adorável",
        imagem: "https://http.cat/images/cute.jpg"
    },
    {
        id: 3,
        descricao: "Erro 404: Gato não encontrado",
        imagem: "https://http.cat/images/404.jpg"
    },
    {
        id: 4,
        descricao: "Gato Yoga",
        imagem: "https://http.cat/images/yoga.jpg"
    },
    {
        id: 5,
        descricao: "Gato curioso",
        imagem: "https://http.cat/images/cat.jpg"
    }
];

const post5 = {
    descricao: "Gato comendo lasanha",
    imagem: "https://http.cat/images/lasagna.jpg",
    comentarios: [
        "Que delícia!",
        "Também quero!",
        "Compartilha a receita?"
    ]
};

let livros = {
    "titulo": "O Senhor dos Anéis",
    "autor": "J.R.R. Tolkien",
    "ano": 1954,
    "genero": "Fantasia"
}

function buscarPostPorId(id) {
    return posts.findIndex((post) => {
        return post.id === Number(id);
    });
}

app.use(express.json());

app.get("/posts", (req, res) => {
    res.status(200).json(post);
});

app.get("/posts/:id", (req, res) => {
    const index = buscarPostPorId(req.params.id);
    res.status(200).json(posts[index]);
});

app.get("/livro", (req, res) => {
    res.status(200).send(livros);
});