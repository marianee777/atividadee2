// Importações de pacotes
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import parser from 'body-parser';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';

//iniciando o express e instanciando o OAuth
const app = express();
const client = new OAuth2Client();

// Iniciando o cors
app.use(cors());

// Iniciando o express parser
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

// Iniciando o view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('inicialTest.ejs');
});

app.post('/', async (req, res) => {
	try {
		const { credential } = req.body;
		console.log('Token recebido:', credential);

		const ticket = await client.verifyIdToken({
			idToken: credential,
			audience: process.env.CLIENT_ID,
		});

		const payload = ticket.getPayload();

		console.log(payload.email);
		console.log(payload.name);
		console.log(payload.given_name);

		const userid = payload['sub'];

		const email = payload.email;

		const token = jwt.sign({ userid }, process.env.CLIENT_ID, {
			expiresIn: '1h',
		});
		console.log(`Token de acesso: ${token}`);

		return token;

		//res.render('buscarlivros.ejs', { email: email });

		//res.json({ token }); // ou res.send({ token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Erro interno do servidor' });
	}
});

// Listando porta da aplicação
const port = 8000;

app.listen(port, () =>
	console.log(`A aplicação está rodando em: http://localhost:${port}`)
);
