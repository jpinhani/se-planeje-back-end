const paygroupModel = require('../models/paygroupModel')


module.exports = {
   insertLote(request, response){
   
    console.log(request.body)
   const verify = request.body.filter((filtro) => filtro.DataReal === null || filtro.VlReal === null ||  Number.isInteger(filtro.IdCartao) === false)


    verify.length > 0 ?  response.json({status:400}) :
   request.body.map((item) =>
       paygroupModel.insertLote(item).then(
        result => {
        return response.json(result)
      }
    )
   )
}

}