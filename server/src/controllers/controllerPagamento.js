const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const key = process.env.SECRET_KEY;

exports.cadastrarPG = (req, res) => {
    const db = req.app.get('db');
    const { id_usuario, tipo, valor } = req.body;

    const sql = "INSERT INTO metodosPG (id_usuario, tipo, valor) VALUES (?, ?, ?)";
    const values = [
        id_usuario,
        tipo, 
        valor
    ];

    db.query(sql, values, (err, result) => {
    if (err) {
        console.error("Erro ao cadastrar método de pagamento:", err);
        return res.status(500).json({ msg: 'Erro ao cadastrar método de pagamento' });
    }

    const id_metodo = result.insertId;
    res.status(201).json({ msg: 'Método cadastrado com sucesso', id_metodo, tipo, valor });
    });
};

exports.editarPG = (req, res) => {
    const db = req.app.get('db');
    const { id, tipo, valor } = req.body;

    const sql = "UPDATE metodosPG SET tipo = ?, valor = ? WHERE id_metodo = ?";
    const values = [
        tipo,
        valor,
        id
    ];

    db.query(sql, values, (err, result) => {
    if (err) {
        console.error("Erro ao editar método de pagamento:", err);
        return res.status(500).json({ msg: 'Erro ao editar método de pagamento' });
    }

    if (result.affectedRows > 0) {
        res.status(200).json({ msg: 'Método atualizado com sucesso' });
    } else {
        res.status(404).json({ msg: 'Método não encontrado' });
    }
    });
};

exports.verPG = (req,res) => {
    const db = req.app.get('db');
    const { id_usuario } = req.params;

    const sql = 'select id_metodo as id, tipo, valor FROM metodosPG where id_usuario = ?';
    db.query(sql, [id_usuario], (err, result)=>{
        if(err){
            console.log('Erro ao Buscar');
            return res.status(500).json({msg: 'Erro no Banco'});
        }
        res.status(200).json(result);
    });
};