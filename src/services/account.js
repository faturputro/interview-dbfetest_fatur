import axios from '../plugins/axios'

const ACCOUNT_BASE_URL = '/v1/accounts'

async function getAccount(data) {
  const res = await axios({
    url: `${ACCOUNT_BASE_URL}/search`,
    method: 'POST',
    data,
  })

  return res.data
}

async function createAccount(data) {
  const res = await axios({
    url: ACCOUNT_BASE_URL,
    method: 'POST',
    data,
  })

  return res.data
}

async function updateAccount(id, data) {
  const res = await axios({
    url: `${ACCOUNT_BASE_URL}/${id}`,
    method: 'PATCH',
    data,
  })

  return res.data
}

async function closeAccount(id) {
  const res = await axios({
    url: `${ACCOUNT_BASE_URL}/${id}/close`,
    method: 'PATCH',
  })

  return res.data
}

export default {
  getAccount,
  createAccount,
  updateAccount,
  closeAccount
}