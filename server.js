import express from "express";

const app = express();
app.listen(3000, () => {
    console.log("Servidor operante.");
});

app.get("/", (req, res) => {
    res.status(200).send("Bem vido!");
});

let livros = {
    "titulo": "O Senhor dos Anéis",
    "autor": "J.R.R. Tolkien",
    "ano": 1954,
    "genero": "Fantasia"
}

app.get("/livro", (req, res) => {
    res.status(200).send(livros);
});