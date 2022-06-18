import axios from '../plugins/axios'

const PAYMENT_BASE_URL = '/v1/payments'

async function getPayments(data) {
  const res = await axios({
    url: `${PAYMENT_BASE_URL}/search`,
    method: 'POST',
    data,
  })

  return res.data
}

async function createPayment(data) {
  const res = await axios({
    url: PAYMENT_BASE_URL,
    method: 'POST',
    data,
  })

  return res.data
}

export default {
  getPayments,
  createPayment
}
