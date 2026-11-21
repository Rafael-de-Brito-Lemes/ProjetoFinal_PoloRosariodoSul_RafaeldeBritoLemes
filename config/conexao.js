import dns from 'node:dns';
import 'dotenv/config';
import mongoose from 'mongoose';

dns.setServers(['8.8.8.8']);

const conectarBanco = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log('Banco de dados conectado!');
    } catch (erro) {
        console.log('Erro ao conectar ao banco:', erro.message);
        throw erro;
    }
};

export default conectarBanco;