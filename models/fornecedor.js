import mongoose from 'mongoose';

const fornecedorSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    endereco: {
        type: String
    }
});

const Fornecedor = mongoose.model('Fornecedor', fornecedorSchema);

export default Fornecedor;