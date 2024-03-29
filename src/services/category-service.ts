import { requestBackend } from '@/utils'
import { AxiosRequestConfig } from 'axios'

export function findAllRequest() {
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: '/categories',
  }

  return requestBackend(config)
}
