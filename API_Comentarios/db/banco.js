const mongoose = require('mongoose');

const banco = async () => {
	try {
		await mongoose.connect(
		);

		console.log('BANCO OPERANDO');
	} catch (error) {
		console.log(`Erro: ${error}`);
	}
};

module.exports = banco;
