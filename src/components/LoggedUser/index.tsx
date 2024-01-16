import './styles.css'
import React from 'react'
import { Link } from 'react-router-dom'
import { ContextToken } from '@/utils/context-token'
import * as authService from '@/services/auth-service'

export const LoggedUser = () => {
  const { contextTokenPayload, setContextTokenPayload } =
    React.useContext(ContextToken)

  function handleLogoutClick() {
    authService.logout()
    setContextTokenPayload(undefined)
  }

  return contextTokenPayload && authService.isAuthenticated() ? (
    <div className="dsc-logged-user">
      <p>{contextTokenPayload.user_name}</p>
      <span onClick={handleLogoutClick}>Sair</span>
    </div>
  ) : (
    <Link className="dsc-enter" to={'/login'}>
      Entrar
    </Link>
  )
}
