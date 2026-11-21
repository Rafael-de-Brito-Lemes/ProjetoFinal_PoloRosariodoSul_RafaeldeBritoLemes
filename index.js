import express from 'express';
import conectarBanco from './config/conexao.js';

import Instrumento from './models/instrumento.js';
import Categoria from './models/categoria.js';
import Fornecedor from './models/fornecedor.js';

const app = express();
// Configuração para receber dados dos formulários
app.use(express.urlencoded({ extended: true }));

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Rota inicial
app.get('/', (req, res) => {
    res.render('index');
});

// Listar e pesquisar categorias
app.get('/categoria/lst', async (req, res) => {
    try {
        const busca = req.query.busca || '';

        const categorias = await Categoria.find({
            nome: { $regex: busca, $options: 'i' }
        });

        res.render('categoria/lst', {
            categorias: categorias,
            busca: busca
        });

    } catch (erro) {
        console.log('Erro ao listar categorias:', erro);
        res.status(500).send('Erro ao listar categorias.');
    }
});

// Visualizar uma categoria
app.get('/categoria/view/:id', async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.id);

        if (!categoria) {
            return res.status(404).send('Categoria não encontrada.');
        }

        res.render('categoria/view', {
            categoria: categoria
        });

    } catch (erro) {
        console.log('Erro ao visualizar categoria:', erro);
        res.status(500).send('Erro ao visualizar categoria.');
    }
});

// Exibir formulário de cadastro
app.get('/categoria/add', (req, res) => {
    res.render('categoria/add');
});

// Receber e salvar uma nova categoria
app.post('/categoria/add/ok', async (req, res) => {
    try {
        const categoria = new Categoria({
            nome: req.body.nome,
            descricao: req.body.descricao
        });

        await categoria.save();

        res.render('categoria/addok', {
            categoria: categoria
        });

    } catch (erro) {
        console.log('Erro ao cadastrar categoria:', erro);
        res.status(500).send('Erro ao cadastrar categoria.');
    }
});

// Exibir formulário de edição da categoria
app.get('/categoria/edit/:id', async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.id);

        if (!categoria) {
            return res.status(404).send('Categoria não encontrada.');
        }

        res.render('categoria/edit', {
            categoria: categoria
        });

    } catch (erro) {
        console.log('Erro ao buscar categoria:', erro);
        res.status(500).send('Erro ao buscar categoria.');
    }
});

// Receber e salvar as alterações da categoria
app.post('/categoria/edit/ok', async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.body.id);

        if (!categoria) {
            return res.status(404).send('Categoria não encontrada.');
        }

        categoria.nome = req.body.nome;
        categoria.descricao = req.body.descricao;

        await categoria.save();

        res.redirect('/categoria/lst');

    } catch (erro) {
        console.log('Erro ao editar categoria:', erro);
        res.status(500).send('Erro ao editar categoria.');
    }
});

// Excluir categoria
app.post('/categoria/delete', async (req, res) => {
    try {
        await Categoria.findByIdAndDelete(req.body.id);

        res.redirect('/categoria/lst');

    } catch (erro) {
        console.log('Erro ao excluir categoria:', erro);
        res.status(500).send('Erro ao excluir categoria.');
    }
});
// Listar e pesquisar fornecedores
app.get('/fornecedor/lst', async (req, res) => {
    try {
        const busca = req.query.busca || '';

        const fornecedores = await Fornecedor.find({
            nome: { $regex: busca, $options: 'i' }
        });

        res.render('fornecedor/lst', {
            fornecedores: fornecedores,
            busca: busca
        });

    } catch (erro) {
        console.log('Erro ao listar fornecedores:', erro);
        res.status(500).send('Erro ao listar fornecedores.');
    }
});

// Visualizar um fornecedor
app.get('/fornecedor/view/:id', async (req, res) => {
    try {
        const fornecedor = await Fornecedor.findById(req.params.id);

        if (!fornecedor) {
            return res.status(404).send('Fornecedor não encontrado.');
        }

        res.render('fornecedor/view', {
            fornecedor: fornecedor
        });

    } catch (erro) {
        console.log('Erro ao visualizar fornecedor:', erro);
        res.status(500).send('Erro ao visualizar fornecedor.');
    }
});

// Exibir formulário de cadastro
app.get('/fornecedor/add', (req, res) => {
    res.render('fornecedor/add');
});

// Receber e salvar um novo fornecedor
app.post('/fornecedor/add/ok', async (req, res) => {
    try {
        const fornecedor = new Fornecedor({
            nome: req.body.nome,
            telefone: req.body.telefone,
            email: req.body.email,
            endereco: req.body.endereco
        });

        await fornecedor.save();

        res.render('fornecedor/addok', {
            fornecedor: fornecedor
        });

    } catch (erro) {
        console.log('Erro ao cadastrar fornecedor:', erro);
        res.status(500).send('Erro ao cadastrar fornecedor.');
    }
});

// Exibir formulário de edição
app.get('/fornecedor/edit/:id', async (req, res) => {
    try {
        const fornecedor = await Fornecedor.findById(req.params.id);

        if (!fornecedor) {
            return res.status(404).send('Fornecedor não encontrado.');
        }

        res.render('fornecedor/edit', {
            fornecedor: fornecedor
        });

    } catch (erro) {
        console.log('Erro ao buscar fornecedor:', erro);
        res.status(500).send('Erro ao buscar fornecedor.');
    }
});

// Receber e salvar as alterações do fornecedor
app.post('/fornecedor/edit/ok', async (req, res) => {
    try {
        const fornecedor = await Fornecedor.findById(req.body.id);

        if (!fornecedor) {
            return res.status(404).send('Fornecedor não encontrado.');
        }

        fornecedor.nome = req.body.nome;
        fornecedor.telefone = req.body.telefone;
        fornecedor.email = req.body.email;
        fornecedor.endereco = req.body.endereco;

        await fornecedor.save();

        res.redirect('/fornecedor/lst');

    } catch (erro) {
        console.log('Erro ao editar fornecedor:', erro);
        res.status(500).send('Erro ao editar fornecedor.');
    }
});

// Excluir fornecedor
app.post('/fornecedor/delete', async (req, res) => {
    try {
        await Fornecedor.findByIdAndDelete(req.body.id);

        res.redirect('/fornecedor/lst');

    } catch (erro) {
        console.log('Erro ao excluir fornecedor:', erro);
        res.status(500).send('Erro ao excluir fornecedor.');
    }
});

// Listar e pesquisar instrumentos
app.get('/instrumento/lst', async (req, res) => {
    try {
        const busca = req.query.busca || '';

        const instrumentos = await Instrumento.find({
            nome: { $regex: busca, $options: 'i' }
        });

        res.render('instrumento/lst', {
            instrumentos: instrumentos,
            busca: busca
        });

    } catch (erro) {
        console.log('Erro ao listar instrumentos:', erro);
        res.status(500).send('Erro ao listar instrumentos.');
    }
});

// Visualizar um instrumento
app.get('/instrumento/view/:id', async (req, res) => {
    try {
        const instrumento = await Instrumento.findById(req.params.id);

        if (!instrumento) {
            return res.status(404).send('Instrumento não encontrado.');
        }

        res.render('instrumento/view', {
            instrumento: instrumento
        });

    } catch (erro) {
        console.log('Erro ao visualizar instrumento:', erro);
        res.status(500).send('Erro ao visualizar instrumento.');
    }
});

// Exibir formulário de cadastro de instrumento
app.get('/instrumento/add', (req, res) => {
    res.render('instrumento/add');
});

// Receber e salvar um novo instrumento
app.post('/instrumento/add/ok', async (req, res) => {
    try {
        const instrumento = new Instrumento({
            nome: req.body.nome,
            fabricante: req.body.fabricante,
            preco: req.body.preco,
            tipo: req.body.tipo,
            descricao: req.body.descricao
        });

        await instrumento.save();

        res.render('instrumento/addok', {
            instrumento: instrumento
        });

    } catch (erro) {
        console.log('Erro ao cadastrar instrumento:', erro);
        res.status(500).send('Erro ao cadastrar instrumento.');
    }
});

// Exibir formulário de edição do instrumento
app.get('/instrumento/edit/:id', async (req, res) => {
    try {
        const instrumento = await Instrumento.findById(req.params.id);

        if (!instrumento) {
            return res.status(404).send('Instrumento não encontrado.');
        }

        res.render('instrumento/edit', {
            instrumento: instrumento
        });

    } catch (erro) {
        console.log('Erro ao buscar instrumento:', erro);
        res.status(500).send('Erro ao buscar instrumento.');
    }
});

// Receber e salvar as alterações do instrumento
app.post('/instrumento/edit/ok', async (req, res) => {
    try {
        const instrumento = await Instrumento.findById(req.body.id);

        if (!instrumento) {
            return res.status(404).send('Instrumento não encontrado.');
        }

        instrumento.nome = req.body.nome;
        instrumento.fabricante = req.body.fabricante;
        instrumento.preco = req.body.preco;
        instrumento.tipo = req.body.tipo;
        instrumento.descricao = req.body.descricao;

        await instrumento.save();

        res.redirect('/instrumento/lst');

    } catch (erro) {
        console.log('Erro ao editar instrumento:', erro);
        res.status(500).send('Erro ao editar instrumento.');
    }
});

// Excluir instrumento
app.post('/instrumento/delete', async (req, res) => {
    try {
        await Instrumento.findByIdAndDelete(req.body.id);

        res.redirect('/instrumento/lst');

    } catch (erro) {
        console.log('Erro ao excluir instrumento:', erro);
        res.status(500).send('Erro ao excluir instrumento.');
    }
});

// Inicialização do servidor
const iniciarServidor = async () => {
    await conectarBanco();

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Servidor iniciado na porta ${PORT}!`);
    });
};

iniciarServidor();