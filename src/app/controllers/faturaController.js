const Moment = require('moment')
const FaturaModel = require('../models/faturaModel')

module.exports = {

  getfaturaDetalhe(request, response) {
    FaturaModel.getfaturaDetalhe(request.params.idUser).then(result => {

      const novosDados = result.map((data) => {
        const dataVencimento = Moment(data.DT_VENCIMENTO, "YYYY/MM/DD").format("DD-MM-YYYY");
        const dataReal = Moment(data.DT_REAL).format("DD-MM-YYYY");
        const dataCredito = Moment(data.DT_CREDITO).format("DD-MM-YYYY");

        const vlReal = data.VL_REAL;
        const formatter = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });

        const novoReal = formatter.format(vlReal)
        const Trat1r = novoReal.toString().replace(".", " ")
        const Trat2r = Trat1r.toString().replace(",", ".")
        const novoVlReal = Trat2r.toString().replace(" ", ",")

        const novaData = {
          ID_FATURA: data.ID_FATURA,
          DT_VENCIMENTO: data.DT_VENCIMENTO,
          DT_VENCIMENTO2: dataVencimento,
          DT_PAGAMENTO: data.DT_PAGAMENTO,
          DT_PAGAMENTO2: dataReal,
          DT_CREDITO: data.DT_CREDITO,
          DT_CREDITO2: dataCredito,
          VL_REAL: data.VL_REAL,
          VL_REAL2: novoVlReal,
          DESCR_DESPESA: data.DESCR_DESPESA
        }

        return novaData
      })

      return response.json(novosDados)
    })


  },

  getfaturaAll(request, response) {
    FaturaModel.getfaturaAll(request.params.idUser).then(result => {

      const novosDados = result.map((data) => {
        const dataVencimento = Moment(data.DT_VENCIMENTO, "YYYY/MM/DD").format("DD-MM-YYYY");
        const dataReal = Moment(data.DT_REAL).format("DD-MM-YYYY");

        const vlReal = data.VL_REAL;
        const formatter = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });

        const novoReal = formatter.format(vlReal)
        const Trat1r = novoReal.toString().replace(".", " ")
        const Trat2r = Trat1r.toString().replace(",", ".")
        const novoVlReal = Trat2r.toString().replace(" ", ",")

        const novaData = {
          ID_FATURA: data.ID_FATURA,
          DT_VENCIMENTO: data.DT_VENCIMENTO,
          DT_VENCIMENTO2: dataVencimento,
          DT_PAGAMENTO: data.DT_PAGAMENTO,
          DT_PAGAMENTO2: dataReal,
          VL_REAL: data.VL_REAL,
          VL_REAL2: novoVlReal
        }

        return novaData
      })

      return response.json(novosDados)
    })
  },
  deleteDespesaFatura(request, response) {

    FaturaModel.deleteDespesaFatura(request.body).then(result => {
      return response.json(result)
    })
  }
}

