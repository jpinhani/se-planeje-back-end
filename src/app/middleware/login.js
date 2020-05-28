const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, "BAE39995479EB");
        req.usuario = decode;
        next();
    } catch (error) {
        // return res.status(401).send({ mensagem: 'Falha na Autenticação do Token' }).json(error)
        return res.status(401).json(error)
    }

}