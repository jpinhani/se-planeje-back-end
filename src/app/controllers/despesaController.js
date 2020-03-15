const DespesaModel = require('../models/despesaModel')

module.exports = {
  getCartao(request, response) {
    DespesaModel.getCartao(request.params.idUser).then(result => {
      return response.json(result)
    })
  },

  getCategory(request, response) {
    DespesaModel.getCategory(request.params.idUser).then(result => {
      return response.json(result)
    })
  },

  getDespesaAll(request, response) {
    DespesaModel.getDespesaAll(request.params.idUser).then(result => {

      /* Trantado a Data para o Padrão Português*/
      const novosDados = result.map((data) => {
        const mm = data.DT_PREVISTO.getMonth() + 1;
        const dd = result[0].DT_PREVISTO.getDate();
        const yyyy = result[0].DT_PREVISTO.getFullYear();
        const dataNova = dd + '/' + mm + '/' + yyyy

        /* Trantado o VL_PREVISTO para o Padrão Real*/
        const vlPrevisto = data.VL_PREVISTO;
        const formatter = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });

        const novoPrevisto = formatter.format(vlPrevisto)
        const Trat1 = novoPrevisto.toString().replace(".", " ")
        const Trat2 = Trat1.toString().replace(",", ".")
        const novoVlPrevisto = Trat2.toString().replace(" ", ",")

        const novaData = {
          ID: data.ID,
          ID_USER: data.ID_USER,
          ID_CATEGORIA: data.ID_CATEGORIA,
          DESCR_CATEGORIA: data.DESCR_CATEGORIA,
          CARTAO: data.CARTAO,
          DESCR_DESPESA: data.DESCR_DESPESA,
          NUM_PARCELA: data.NUM_PARCELA,
          VL_PREVISTO: novoVlPrevisto,
          VL_PREVISTO2: data.VL_PREVISTO,
          DT_PREVISTO: data.DT_PREVISTO,
          STATUS: data.STATUS,
          DATANOVA: dataNova
        }

        return novaData
      });
      return response.json(novosDados)
    })
  },

  insertDespesa(request, response) {
    DespesaModel.insertDespesa(resquest.body).then(result => {
      return response.json(result)
    })
  },

  updateDespesa(request, response) {
    DespesaModel.updateDespesa(resquest.body).then(result => {
      return response.json(result)
    })
  },

  deleteDespesa(request, response) {
    DespesaModel.deleteDespesa(resquest.body).then(result => {
      return response.json(result)
    })
  }

}