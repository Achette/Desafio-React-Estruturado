import { LoggedUser } from '../LoggedUser'
import homeIcon from '../../assets/home.svg'
import { Link, NavLink } from 'react-router-dom'
import productsIcon from '../../assets/products.svg'
import './styles.css'

export const HeaderAdmin = () => {
  return (
    <header className="dsc-header-admin">
      <nav className="dsc-container">
        <Link to={'/admin/home'}>
          <h1>RHCommerce</h1>
        </Link>
        <div className="dsc-navbar-right">
          <div className="dsc-menu-items-container">
            <NavLink
              to="/admin/home"
              className={({ isActive }) =>
                isActive ? 'dsc-menu-item-active' : ''
              }
            >
              <div className="dsc-menu-item">
                <img src={homeIcon} alt="Início" />
                <p>Início</p>
              </div>
            </NavLink>
            <NavLink
              to="/admin/products"
              className={({ isActive }) =>
                isActive ? 'dsc-menu-item-active' : ''
              }
            >
              <div className="dsc-menu-item">
                <img src={productsIcon} alt="Cadastro de produtos" />
                <p>Produtos</p>
              </div>
            </NavLink>
          </div>
          <LoggedUser />
        </div>
      </nav>
    </header>
  )
}
