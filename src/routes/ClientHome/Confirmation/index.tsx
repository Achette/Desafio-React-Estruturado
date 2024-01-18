import './styles.css'
import React from 'react'
import { OrderDTO } from '@/models'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import * as orderService from '@/services/order-service'

export const Confirmation = () => {
  const params = useParams()
  const [order, setOrder] = React.useState<OrderDTO>()

  React.useEffect(() => {
    orderService.findByIdRequest(Number(params.orderId)).then((response) => {
      setOrder(response.data)
    })
  }, [])

  return (
    <main>
      <section id="confirmation-section" className="dsc-container">
        <div className="dsc-card dsc-mb20">
          {order?.items.map((item) => (
            <div
              key={item.productId}
              className="dsc-cart-item-container dsc-line-bottom"
            >
              <div className="dsc-cart-item-left">
                <img src={item.imgUrl} alt={item.name} />
                <div className="dsc-cart-item-description">
                  <h3>{item.name}</h3>
                  <div className="dsc-cart-item-quantity-container">
                    <p>{item.quantity}</p>
                  </div>
                </div>
              </div>
              <div className="dsc-cart-item-right">
                R$ {item.subTotal.toFixed(2)}
              </div>
            </div>
          ))}

          <div className="dsc-cart-total-container">
            <h3>R$ {order?.total.toFixed(2)}</h3>
          </div>
        </div>

        <div className="dsc-confirmation-message dsc-mb20">
          Pedido realizado! Número {order?.id}
        </div>

        <div className="dsc-btn-page-container">
          <Link to={'/'}>
            <div className="dsc-btn dsc-btn-inverse">Início</div>
          </Link>
        </div>
      </section>
    </main>
  )
}
