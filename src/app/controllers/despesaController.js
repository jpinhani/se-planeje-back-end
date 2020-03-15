const Moment = require('moment')
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
    const numparcelas = request.body.parcela
    let linhas = 0
    let erro = 0
    let num = 1
    if (numparcelas > 1) {

      for (let par = 0; par < numparcelas; par++) {
        let date = Moment(request.body.dataPrevista)
        if (par > 0) {
          date.add(1, 'month');
        }
        request.body.dataPrevista = date.format("YYYY-MM-DD")
        request.body.parcela = num

        DespesaModel.insertDespesa(request.body).then(result => {

          if (result.status === 200) {
            linhas = linha + 1
          } else { erro = erro + 1 }

        })
        num = num + 1
      }
    } else {

      DespesaModel.insertDespesa(request.body).then(result => {
        return response.json(result)
      })
    } if (erro === 0) {
      return response.json(200)
    } else {
      return response.json(erro)
    }
  },



  updateDespesa(request, response) {
    DespesaModel.updateDespesa(request.body).then(result => {
      return response.json(result)
    })
  },

  deleteDespesa(request, response) {
    DespesaModel.deleteDespesa(request.body).then(result => {
      return response.json(result)
    })
  }

}