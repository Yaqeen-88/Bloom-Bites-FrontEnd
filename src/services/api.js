import axios from "axios"
export const BASE_URL = 'http://localhost:3000'


const Bloom = axios.create({ baseURL: BASE_URL})

Bloom.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token')

    if(token) {
      config.headers['authorization'] = `Bearer ${token}`
    }
    return config
  },
  async (error) => {
    console.log({msg: 'Axios Interceptor Error!', error})
    throw error
  }
)
export default Bloom
