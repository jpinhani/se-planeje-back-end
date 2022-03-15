const Model = require('../models/transferenciaModel')
const Moment = require('moment');

module.exports = {
  getTransferenciaAll(request, response) {
    Model.getTransferenciaAll(request.params.id).then(result => {

      const novosDados = result.map((data) => {
        const dataTransferencia = Moment(data.DATA_TRANSFERENCIA, "YYYY/MM/DD").format("DD-MM-YYYY");
       
        const valorTransferencia = data.VALOR;

        const formatter = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });

        const novoReal = formatter.format(valorTransferencia)
        const Trat1r = novoReal.toString().replace(".", " ")
        const Trat2r = Trat1r.toString().replace(",", ".")
        const novoVlReal = Trat2r.toString().replace(" ", ",")

        const novaData = {
          ID: data.ID,
          ID_USER: data.ID_USER,
          ID_CONTADEBITO: data.ID_CONTADEBITO,
          CONTA_DEBITO: data.CONTA_DEBITO,
          ID_CONTACREDITO: data.ID_CONTACREDITO,
          CONTA_CREDITO: data.CONTA_CREDITO,
          DATA_TRANSFERENCIA: data.DATA_TRANSFERENCIA,
          DATA_TRANSFERENCIA2: dataTransferencia,
          VALOR: data.VALOR,
          VALOR2: novoVlReal,
          DESCR_TRANSFERENCIA: data.DESCR_TRANSFERENCIA,
          STATUS: data.STATUS
        }

        return novaData
      })

      return response.json(novosDados)
    })
  },

  insertTransferencia(request, response) {
    //  console.log(request.body)
    Model.insertTransferencia(request.body).then(result => {
      return response.json(result)
    })
  },

  updateTransferencia(request, response) {
    request.body.id = request.params.id
    Model.updateTransferencia(request.body).then(result => {
      return response.json(result)
    })
  },

  deleteTransferencia(request, response) {
    request.body.id = request.params.id
    Model.deleteTransferencia(request.body).then(result => {
      return response.json(result)
    })
  }
}