import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001',
})

api.interceptors.request.use(async config => {
  const token = await localStorage.getItem('nexDigital:userToken')
  config.headers.authorization = `Bearer ${token && JSON.parse(token)}`
  return config
})

export default api
