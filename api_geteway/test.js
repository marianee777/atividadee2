
import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

const linkApiGoogle = 'https://www.googleapis.com/auth/books';

app.get('/livros', async (req, res) => {
	const buscarLivros = req.query.q;
	const config = {};
	const link = `${linkApiGoogle}?q=${buscarLivros}+intitle`;
	const response = await fetch(link, config);
	res.json(response.json());
});

app.get('/livros/:id', async (req, res) => {
	const { id } = req.body;
	const config = {};
	const response = await fetch(`${linkApiGoogle}?id=${id}`, config);
	res.json(response.json());
});

const port = 8000;

app.listen(port, () =>
	console.log(`Aplication running in http://localhost:${port}`)
);
