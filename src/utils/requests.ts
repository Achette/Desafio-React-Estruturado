import { BASE_URL } from './system'
import { history } from './history'
import axios, { AxiosRequestConfig } from 'axios'
import * as authService from '@/services/auth-service'

export const requestBackend = (config: AxiosRequestConfig) => {
  const headers = config.withCredentials
    ? {
        ...config.headers,
        Authorization: 'Bearer ' + authService.getAccessToken(),
      }
    : config.headers

  return axios({ ...config, baseURL: BASE_URL, headers })
}

axios.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status === 401) {
      history.push('/login')
    }
    if (error.response.status === 403) {
      history.push('/catalog')
    }
    return Promise.reject(error)
  }
)
