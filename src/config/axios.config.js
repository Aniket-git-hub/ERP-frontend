import axios from 'axios'
import getEnvVariable from '../utils/getEnvVariable'

const instance = axios.create({
    baseURL: getEnvVariable('BASE_URL')
})

export default instance
