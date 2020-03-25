const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {

    try {

        const decode = jwt.verify(req.body.token, "BAE39995479EB");
        req.usuario = decode;
        next();
    } catch (error) {
        return res.status(401).send({ mensagem: 'Falha na Autenticação do Token' })
    }

}