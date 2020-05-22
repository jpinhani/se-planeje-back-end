const chartModel = require('../models/chartModel')

module.exports = {

    getChartDespesa(request, response) {
        try {
            chartModel.getChartDespesa(request.params.id).then(result => {
                return response.json(result)
            })
        } catch (error) {
            return response.status(400).json(error)
        }
    },

    getChartReceita(request, response) {
        try {
            chartModel.getChartReceita(request.params.id).then(result => {
                return response.json(result)
            })
        } catch (error) {
            return response.status(400).json(error)
        }
    }
}