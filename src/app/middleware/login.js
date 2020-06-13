const jwt = require('jsonwebtoken')
require("dotenv").config();


module.exports = (req, res, next) => {

    try {
        // console.log(req.headers.authorization)
        const token = req.headers.authorization.split(' ')[1]
        const user = req.headers.user
        const decode = jwt.verify(token, process.env.SP_JWT);

        req.usuario = decode;
        if (parseFloat(decode.id) === parseFloat(user))
            next();
    } catch (error) {
        // return res.status(401).send({ mensagem: 'Falha na Autenticação do Token' }).json(error)
        return res.status(401).json(error)
    }

}