import React from 'react'
import CartIcon from '../CartIcon'
import { LoggedUser } from '../LoggedUser'
import { Link } from 'react-router-dom'
import iconAdmin from '../../assets/settings.svg'
import { ContextToken } from '@/utils/context-token'
import * as authService from '@/services/auth-service'
import './styles.css'

export const HeaderClient = () => {
  const { contextTokenPayload } = React.useContext(ContextToken)

  return (
    <header className="dsc-header-client">
      <nav className="dsc-container">
        <Link to={'/'}>
          <h1>DSCommerce</h1>
        </Link>
        <div className="dsc-navbar-right">
          <div className="dsc-menu-items-container">
            {contextTokenPayload && authService.hasAnyRoles(['ROLE_ADMIN']) && (
              <Link to="/admin">
                <div className="dsc-menu-item">
                  <img src={iconAdmin} alt="Admin" />
                </div>
              </Link>
            )}
            <Link to="/cart">
              <div className="dsc-menu-item">
                <CartIcon />
              </div>
            </Link>
          </div>
          <LoggedUser />
        </div>
      </nav>
    </header>
  )
}
