const Moment = require('moment')
const ReceitaModel = require('../models/receitaModel')

module.exports = {

  getCategory(request, response) {
    ReceitaModel.getCategory(request.params.idUser).then(result => {
      return response.json(result)
    })
  },

  getReceitaAll(request, response) {
    ReceitaModel.getReceitaAll(request.params.idUser).then(result => {

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
          DESCR_RECEITA: data.DESCR_RECEITA,
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

  insertReceita(request, response) {
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

        ReceitaModel.insertReceita(request.body).then(result => {

          if (result.status === 200) {
            linhas = linha + 1
          } else { erro = erro + 1 }

        })
        num = num + 1
      }
    } else {

      ReceitaModel.insertReceita(request.body).then(result => {
        return response.json(result)
      })
    } if (erro === 0) {
      return response.json(200)
    } else {
      return response.json(erro)
    }
  },



  async updateReceita(request, response) {
    request.body.id = request.params.id
    let linhas = 0
    let erro = 0
    let numRegistros = 0
    if (request.body.valueEdit === 'Apenas essa parcela será alterada') {

      ReceitaModel.updateReceita(request.body).then(result => {
        return response.json(result)
      })
    } else {
      ReceitaModel.selectReceitaGroup(request.body).then(result => {

        numRegistros = result[0].registros
        ReceitaModel.deleteReceitaGroup(request.body).then(deletes => {

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

              ReceitaModel.insertReceita(request.body).then(result => {

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

  deleteReceita(request, response) {
    console.log('body', request.body)
    request.body.id = request.params.id
    console.log('body esta assim valueEdit', request.body)
    if (request.body.valueEdit === 'Deletar Receita Selecionada') {

      ReceitaModel.deleteReceita(request.body).then(result => {
        return response.json(result)
      })

    } else {

      ReceitaModel.deleteReceitaGroup(request.body).then(result => {
        return response.json(result)
      })

    }
  }
}