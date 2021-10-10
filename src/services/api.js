import axios from 'axios'
import { endPoint } from './../constants/config'

const api = axios.create({
    baseURL: endPoint
})

  
export default api