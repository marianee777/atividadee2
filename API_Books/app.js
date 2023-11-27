// Importações de pacotes
import parser from 'body-parser';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import axios from 'axios';

//iniciando o express e instanciando o OAuth
const app = express();

// Iniciando o cors
app.use(
	cors({
		credentials: true,
	})
);

// Iniciando o express parser
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

// Iniciando o view engine
app.set('view engine', '../GoogleLogin/views');

const buscarLivros = async (pesquisa, numeroDeResultados) => {
	const apikey = 'AIzaSyBVDxdtV0Fn71440l0yEU4QvLD0rEdH-ZM';
	const url = `https://www.googleapis.com/books/v1/volumes?q=${pesquisa}&${apikey}`;
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (erro) {
		throw erro;
	}
};

app.get('/', async (req, res) => {
	res.render('formulario.ejs');
});

app.post('/buscarlivro', async (req, res) => {
	try {
		const pesquisa = req.body.pesquisa;
		const numeroDeResultados = 10;

		const livros = await buscarLivros(pesquisa, numeroDeResultados);

		const totalItems = livros.totalItems;
		const items = livros.items;

		res.render('buscarlivros.ejs', { items: items });
	} catch (erro) {
		res.status(500).send(erro.message);
	}
});

// Listando porta da aplicação
const port = 3001;

app.listen(port, () =>
	console.log(`A aplicação está rodando em: http://localhost:${port}`)
);
