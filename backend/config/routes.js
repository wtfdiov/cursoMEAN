const express = require('express')
const auth = require('./auth')

module.exports = function (server) {

  // API Routes
  const router = express.Router()
  server.use('/api', router)

  //Rotas da API
  const billingCycleService = require('../api/billingCycle/BillingCycleService')
  billingCycleService.register(router, '/billingCycles')

  const billingSummaryService = require('../api/billingSummary/billingSummaryService')
  router.route('/billingSummary').get(billingSummaryService.getSummary)
}
