const crypto = require('crypto')

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
    console.log('Login solicitado com:', req.body);
    const db = req.app.get('db');

    const sql = "select * from usuarios where email_usuario = ? and senha_usuario = ?"
    const values = [
        req.body.email,
        req.body.senha
    ]

    db.query(sql, values, (err, result)=>{
        console.log('Resultado da consulta ao banco:', result);
        if(result.length > 0){
            console.log('entrei no if')
            res.status(201).json({msg: 'Login bem-sucedido'})
        } else {
            console.log('entrei no else')
            res.status(401).json({msg: 'Login FOI UMA MERDA'})
        }
    });
}