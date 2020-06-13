const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {

    try {
        // console.log(req.headers.authorization)
        const token = req.headers.authorization.split(' ')[1]
        const user = req.headers.user
        const decode = jwt.verify(token, "BAE39995479EB");

        req.usuario = decode;
        // console.log('decode', parseFloat(decode.id) === parseFloat(user))
        // console.log('user', `${user}`)
        if (parseFloat(decode.id) === parseFloat(user))
            next();
    } catch (error) {
        // return res.status(401).send({ mensagem: 'Falha na Autenticação do Token' }).json(error)
        return res.status(401).json(error)
    }

}