const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const key = process.env.SECRET_KEY;

exports.cadastrar =(req, res)=>{
    const db = req.app.get('db')
    const sql = "insert into usuarios(nome_usuario, email_usuario, senha_usuario, cpf_usuario, endereco_usuario) values(?, ?, ?, ?, ?) "
    const values =[ 
        req.body.nome,
        req.body.email,
        req.body.senha,
        req.body.cpf,
        req.body.endereco
    ]

    
    db.query(sql, values, (err, result)=>{
        if(err){
            console.error("Erro ao cadastrar:" + err)
            return res.status(500).json({msg: 'Erro ao cadastrar'})
        }
        res.status(201).json({msg: 'Cadastro concluido'})
    })

}

exports.logar = (req,res)=>{
    const db = req.app.get('db');

    const sql = "select * from usuarios where email_usuario = ? and senha_usuario = ?"
    const values = [
        req.body.email,
        req.body.senha
    ]

    db.query(sql, values, (err, result)=>{
        if(result.length > 0){
            const user = result[0]

            const payload = {
                id: user.id_usuario,
                nome: user.nome_usuario,
                email: user.email_usuario
            };

            const data = new Date();
            data.setHours(new Date().getHours() + 10);

            const token = jwt.sign(payload, key, {expiresIn: data.getTime()});

            res.status(201).json({token})
        } else {
            res.status(401).json({msg: 'Login FOI UMA MERDA'})
        }
    });
}

exports.editar = (req,res)=>{
    console.log('oi do controller')
    const db = req.app.get('db');
    const {campo, valorNovo, id} = req.body;

    const camposPermitidos = ['nome_usuario', 'email_usuario', 'endereco_usuario', 'cpf_usuario', 'senha_usuario'];

    if (!camposPermitidos.includes(campo)) {
        return res.status(400).json({ msg: 'Campo inválido' });
    }
    
    const sql = `update usuarios set ${campo} = ? where id_usuario = ?`;
    db.query(sql, [valorNovo, id], (err, result)=>{
        if(err){
            console.log(err);
            return res.status(500).json({msg: 'Erro no Banco'});
        }

        if(result.affectedRows > 0){
            console.log('Edição bem Sucedida');
            return res.status(200).json({msg: 'Edição foi um Sucesso'});
        } else {
            return res.status(400).json({msg: 'Erro ao Editar... Nenhum usuario alterado'});
        }
    });
}