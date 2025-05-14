const jwt = require('jsonwebtoken');
const key = process.env.SECRET_KEY;

exports.pegarPerfil = (req, res) => {
    const db = req.app.get('db');

    const id_usuario = req.user.id;
    
    const sql = "select nome_usuario, email_usuario, id_usuario from usuarios where id_usuario = ?";
    db.query(sql, [id_usuario], (err, result)=>{
        if(err){
            return res.status(500).json({msg: 'erro ao buscar perfil'});
        }

        console.log(result)

        if(result.length > 0 ){
            return res.status(200).json({
                nome: result[0].nome_usuario,
                email: result[0].email_usuario,
                id: result[0].id_usuario
            });
            
        } else {
            return res.status(401).json({msg: 'Usuario não encontrado'});
        }
    });
};