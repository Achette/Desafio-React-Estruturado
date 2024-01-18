import { ProductDTO } from '@/models'
import { requestBackend } from '@/utils'
import { AxiosRequestConfig } from 'axios'

export const findPageRequest = (
  page: number,
  name: string,
  size = 12,
  // sort = 'name,desc',
  sort = 'name'
) => {
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: '/products',
    params: {
      page,
      name,
      size,
      sort,
    },
  }

  return requestBackend(config)
}

export const findById = (id: number) => {
  return requestBackend({ url: `/products/${id}` })
}

export function deleteById(id: number) {
  const config: AxiosRequestConfig = {
    method: 'DELETE',
    url: `/products/${id}`,
    withCredentials: true,
  }
  return requestBackend(config)
}

export const updateRequest = (obj: ProductDTO) => {
  const config: AxiosRequestConfig = {
    method: 'PUT',
    url: `/products/${obj.id}`,
    withCredentials: true,
    data: obj,
  }
  return requestBackend(config)
}

export const insertRequest = (obj: ProductDTO) => {
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: '/products',
    withCredentials: true,
    data: obj,
  }
  return requestBackend(config)
}
