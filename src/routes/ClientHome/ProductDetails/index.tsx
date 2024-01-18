import React from 'react'
import { ProductDTO } from '@/models'
import { ContextCartCount } from '@/utils'
import * as cartService from '@/services/cart-service'
import * as productService from '@/services/product-service'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ButtonInverse, ButtonPrimary, ProductDetailsCard } from '@/components'
import './styles.css'

export const ProductDetails = () => {
  const params = useParams()
  const [product, setProduct] = React.useState<ProductDTO>()
  const navigate = useNavigate()
  const { setContextCartCount } = React.useContext(ContextCartCount)

  React.useEffect(() => {
    productService
      .findById(Number(params.productId))
      .then((response) => {
        setProduct(response.data)
      })
      .catch((error) => {
        navigate('/')
      })
  }, [])

  function handleBuyClick() {
    if (product) {
      cartService.addProduct(product)
      setContextCartCount(cartService.getCart().items.length)
      navigate('/cart')
    }
  }

  return (
    <>
      <main>
        <section id="product-details-section" className="dsc-container">
          {product && <ProductDetailsCard product={product} />}
          <div className="dsc-btn-page-container">
            <div onClick={handleBuyClick}>
              <ButtonPrimary text="Comprar" />
            </div>
            <Link to={'/'}>
              <ButtonInverse text="Início" />
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
