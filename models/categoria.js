import mongoose from 'mongoose';

const categoriaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    descricao: {
        type: String
    }
});

const Categoria = mongoose.model('Categoria', categoriaSchema);

export default Categoria;