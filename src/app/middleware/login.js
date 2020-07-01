const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')
require("dotenv").config();


module.exports = async (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1]
        const user = req.headers.user

        const Vrfy = await userModel.vrfyPagamento(user)
        if (Vrfy.length === 0)
            return res.json({ status: 400 })

        if (Vrfy[0].status === 'canceled' || Vrfy[0].status === 'unpaid' || Vrfy[0].status === 'pending_payment')
            return res.json({ status: 402 })

        const decode = jwt.verify(token, process.env.SP_JWT);

        req.usuario = decode;
        if (parseFloat(decode.id) === parseFloat(user))
            next();
    } catch (error) {

        return res.status(401).json(error)
    }

}