const crypto = require('crypto')

exports.cadastrar =(req, res)=>{
    const db = req.app.get('db')
    const senha_cripto = crypto.createHash('sha256').update(req.body.senha).digest('hex').slice(0,20);

    const sql = "insert into usuarios(nome_usuario, email_usuario, senha, cpf_usuario, endereco_usuario) values(?, ?, ?, ?, ?) "
    const values =[ 
        req.body.nome,
        req.body.email,
        senha_cripto,
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