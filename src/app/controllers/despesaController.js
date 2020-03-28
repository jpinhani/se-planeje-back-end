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
        const dd = data.DT_PREVISTO.getDate();
        const yyyy = data.DT_PREVISTO.getFullYear();
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
          ID_GRUPO: data.ID_GRUPO,
          ID_USER: data.ID_USER,
          ID_CATEGORIA: data.ID_CATEGORIA,
          DESCR_CATEGORIA: data.DESCR_CATEGORIA,
          ID_CARTAO: data.ID_CARTAO,
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

  insertDespesaReal(request, response) {
    const date = Moment(request.body.dataReal)
    request.body.dataReal = date.format("YYYY-MM-DD")

    const cartao = request.body.cartao.length === 0 ? null : request.body.cartao
    request.body.cartao = cartao

    const conta = request.body.conta.length === 0 ? null : request.body.conta
    request.body.conta = conta

    DespesaModel.insertDespesaReal(request.body).then(result => {

      return response.json(result)
    })
  },

  updateDespesaReal(request, response) {
    const date = Moment(request.body.dataReal)
    request.body.dataReal = date.format("YYYY-MM-DD")

    const cartao = request.body.cartao.length === 0 ? null : request.body.cartao
    request.body.cartao = cartao

    const conta = request.body.conta.length === 0 ? null : request.body.conta
    request.body.conta = conta

    DespesaModel.updateDespesaReal(request.body).then(result => {

      return response.json(result)
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
        let day = request.body.dayValue
        if (par > 0) {
          if (request.body.tipoParcela === 1) {
            date.add(1, 'month');
          } else if (request.body.tipoParcela === 2) {
            date.add(15, 'days');
          } else {
            date.add(day, 'days');
          }
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

  async updateDespesa(request, response) {
    request.body.id = request.params.id
    let linhas = 0
    let erro = 0
    let numRegistros = 0
    if (request.body.valueEdit === 'Apenas essa parcela será alterada') {

      DespesaModel.updateDespesa(request.body).then(result => {
        return response.json(result)
      })
    } else {
      DespesaModel.selectDespesaGroup(request.body).then(result => {

        numRegistros = result[0].registros
        DespesaModel.deleteDespesaGroup(request.body).then(deletes => {

          if (deletes === 'ok') {
            let num = request.body.parcela
            numRegistrosNovo = numRegistros + num
            for (let par = num; par < numRegistrosNovo; par++) {
              let date = Moment(request.body.dataPrevista)
              let day = request.body.dayValue
              if (par > num) {
                if (request.body.tipoParcela === 1) {
                  date.add(1, 'month');
                } else if (request.body.tipoParcela === 2) {
                  date.add(15, 'days');
                } else {
                  date.add(day, 'days');
                }
              }

              request.body.dataPrevista = date.format("YYYY-MM-DD")
              request.body.parcela = par

              DespesaModel.insertDespesa(request.body).then(result => {

                if (result.status === 200) {
                  linhas = linha + 1
                } else { erro = erro + 1 }

              })
              // num = num + 1
            }
            if (erro === 0) {
              return response.json(200)
            } else {
              return response.json(erro)
            }
          } else {
            return response.json('Erro ao Deletar')
          }

        })
      })
    }
  },

  deleteDespesa(request, response) {
    console.log('body', request.body)
    request.body.id = request.params.id
    console.log('body esta assim valueEdit', request.body)
    if (request.body.valueEdit === 'Deletar Despesa Selecionada') {

      DespesaModel.deleteDespesa(request.body).then(result => {
        return response.json(result)
      })

    } else {

      DespesaModel.deleteDespesaGroup(request.body).then(result => {
        return response.json(result)
      })

    }
  },
  pagarDespesaMeta(request, response) {
    request.body.id = request.params.id

    const novoPrevisto = (request.body.valorPrevisto - request.body.valorReal) > 0 ?
      (request.body.valorPrevisto - request.body.valorReal) :
      (request.body.valorPrevisto)


    if (request.body.valueEdit === 'Essa Despesa Esta Sendo Contabilizada' |
      novoPrevisto === request.body.valorPrevisto) {

      DespesaModel.pagarDespesaMeta(request.body).then(result => {
        return response.json(result)
      })
    } else {
      request.body.novoPrevisto = novoPrevisto
      DespesaModel.pagarDespesaMetaAmortizacao(request.body).then(result => {
        return response.json(result)
      })
    }
  },
  getDespesaAllPaga(request, response) {
    DespesaModel.getDespesaAllPaga(request.params.idUser).then(result => {

      /* Trantado a Data para o Padrão Português*/
      const novosDados = result.map((data) => {

        const mm = data.DT_PREVISTO !== null ? data.DT_PREVISTO.getMonth() + 1 : null;
        const dd = data.DT_PREVISTO !== null ? data.DT_PREVISTO.getDate() : null;
        const yyyy = data.DT_PREVISTO !== null ? data.DT_PREVISTO.getFullYear() : null;


        const mmr = data.DT_REAL.getMonth() + 1;
        const ddr = data.DT_REAL.getDate();
        const yyyyr = data.DT_REAL.getFullYear();

        const dataNova = data.DT_PREVISTO !== null ? dd + '/' + mm + '/' + yyyy : null
        const dataNovaReal = ddr + '/' + mmr + '/' + yyyyr

        /* Trantado o VL_PREVISTO para o Padrão Real*/
        const vlPrevisto = data.VL_PREVISTO;
        const vlReal = data.VL_REAL;
        const formatter = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });

        const novoPrevisto = formatter.format(vlPrevisto)
        const Trat1 = novoPrevisto.toString().replace(".", " ")
        const Trat2 = Trat1.toString().replace(",", ".")
        const novoVlPrevisto = Trat2.toString().replace(" ", ",")

        const novoReal = formatter.format(vlReal)
        const Trat1r = novoReal.toString().replace(".", " ")
        const Trat2r = Trat1r.toString().replace(",", ".")
        const novoVlReal = Trat2r.toString().replace(" ", ",")

        const novaData = {
          ID: data.ID,
          ID_GRUPO: data.ID_GRUPO,
          ID_USER: data.ID_USER,
          ID_CATEGORIA: data.ID_CATEGORIA,
          DESCR_CATEGORIA: data.DESCR_CATEGORIA,
          ID_CONTA: data.ID_CONTA,
          DESCR_CONTA: data.DESCR_CONTA,
          ID_CARTAO: data.ID_CARTAO,
          CARTAO: data.CARTAO,
          DESCR_DESPESA: data.DESCR_DESPESA,
          NUM_PARCELA: data.NUM_PARCELA,
          VL_PREVISTO: novoVlPrevisto,
          VL_PREVISTO2: data.VL_PREVISTO,
          VL_REAL: novoVlReal,
          VL_REAL2: data.VL_REAL,
          DT_PREVISTO: data.DT_PREVISTO,
          DT_REAL: data.DT_REAL,
          STATUS: data.STATUS,
          DATANOVA: dataNova,
          DATANOVAREAL: dataNovaReal
        }

        return novaData
      });
      return response.json(novosDados)
    })
  },
  getDespesaAllFatura(request, response) {
    DespesaModel.getDespesaAllFatura(request.params.idUser).then(result => {
      return response.json(result)
    })
  },
  getDespesaAllFaturaDetalhe(request, response) {
    DespesaModel.getDespesaAllFaturaDetalhe(request.params.idUser).then(result => {

      const novosDados = result.map((data) => {

        const dataFatura = Moment(data.FATURA, "DD/MM/YYYY").format("DD-MM-YYYY");


        /* Trantado o VL_PREVISTO para o Padrão Real*/
        const vlPrevisto = data.VL_PREVISTO;
        const vlReal = data.VL_REAL;
        const formatter = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });

        const novoPrevisto = formatter.format(vlPrevisto)
        const Trat1 = novoPrevisto.toString().replace(".", " ")
        const Trat2 = Trat1.toString().replace(",", ".")
        const novoVlPrevisto = Trat2.toString().replace(" ", ",")

        const novoReal = formatter.format(vlReal)
        const Trat1r = novoReal.toString().replace(".", " ")
        const Trat2r = Trat1r.toString().replace(",", ".")
        const novoVlReal = Trat2r.toString().replace(" ", ",")

        const novaData = {
          ID: data.ID,
          ID_DESPESA: data.ID_DESPESA,
          CARTAO: data.CARTAO,
          DESCR_DESPESA: data.DESCR_DESPESA,
          FATURA: dataFatura,
          VL_PREVISTO: novoVlPrevisto,
          VL_PREVISTO2: data.VL_PREVISTO,
          VL_REAL: novoVlReal,
          VL_REAL2: data.VL_REAL,
          NUM_PARCELA: data.NUM_PARCELA,
          STATUS: data.STATUS
        }

        return novaData
      })

      return response.json(novosDados)
    })
  }
}

