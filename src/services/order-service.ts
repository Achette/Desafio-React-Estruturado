import { requestBackend } from '@/utils'
import { AxiosRequestConfig } from 'axios'
import { OrderDTO } from '../models/order'

export const findByIdRequest = (id: number) => {
  const config: AxiosRequestConfig = {
    url: `/orders/${id}`,
    withCredentials: true,
  }
  return requestBackend(config)
}

export const placeOrderRequest = (cart: OrderDTO) => {
  const config: AxiosRequestConfig = {
    url: '/orders',
    method: 'POST',
    withCredentials: true,
    data: cart,
  }
  return requestBackend(config)
}
