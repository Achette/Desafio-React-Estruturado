import { TOKEN_KEY } from '@/utils'

export const save = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token)
}

export const get = (): string | null => {
  return localStorage.getItem(TOKEN_KEY)
}

export const remove = () => {
  localStorage.removeItem(TOKEN_KEY)
}
