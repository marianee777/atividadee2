import express from 'express';
import parser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());


app.get('/', (req, res) => {
	res.send('Testando api dos comentário');
});

const port = 9000;

app.listen(port, () =>
	console.log(`A aplicação está rodando em: http://localhost:${port}`)
);
