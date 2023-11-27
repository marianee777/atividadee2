// Importações de pacotes
import parser from 'body-parser';
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import httProxy from 'express-http-proxy';

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

app.get('/', (req, res) => {
	res.redirect('/login');
});

app.use('/login', httProxy('http://localhost:8000', { timeout: 3000 }));
app.use('/buscarlivros', httProxy('http://localhost:3001', { timeout: 3000 }));
app.use(
	'/buscarlivro',
	httProxy('http://localhost:3001/buscarlivro', { timeout: 3000 })
);

// Listando porta da aplicação
const port = 3000;

app.listen(port, () =>
	console.log(`A aplicação está rodando em: http://localhost:${port}`)
);
