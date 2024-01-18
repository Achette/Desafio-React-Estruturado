import React from 'react'
import { ContextCartCount } from '@/utils'
import cartIcon from '../../assets/shopping-cart.svg'
import './styles.css'

export default function CartIcon() {
  const { contextCartCount } = React.useContext(ContextCartCount)

  return (
    <>
      <img src={cartIcon} alt="Carrinho de compras" />
      {contextCartCount > 0 && (
        <div className="dsc-cart-count">{contextCartCount}</div>
      )}
    </>
  )
}
