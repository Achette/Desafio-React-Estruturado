import React from 'react'
import { PrivateRoute } from './components'
import { AccessTokenPayloadDTO } from './models'
import { Navigate, Route, Routes } from 'react-router-dom'
import * as authService from './services/auth-service'
import * as cartService from './services/cart-service'
import { ContextCartCount, ContextToken, history } from './utils'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import {
  Admin,
  AdminHome,
  Cart,
  Catalog,
  ClientHome,
  Confirmation,
  Login,
  ProductDetails,
  ProductForm,
  ProductListing,
} from './routes'

export default function App() {
  const [contextCartCount, setContextCartCount] = React.useState<number>(0)
  const [contextTokenPayload, setContextTokenPayload] =
    React.useState<AccessTokenPayloadDTO>()

  React.useEffect(() => {
    setContextCartCount(cartService.getCart().items.length)

    if (authService.isAuthenticated()) {
      const payload = authService.getAccessTokenPayload()
      setContextTokenPayload(payload)
    }
  }, [])

  return (
    <ContextToken.Provider
      value={{ contextTokenPayload, setContextTokenPayload }}
    >
      <ContextCartCount.Provider
        value={{ contextCartCount, setContextCartCount }}
      >
        <HistoryRouter history={history}>
          <Routes>
            <Route path="/" element={<ClientHome />}>
              <Route index element={<Catalog />} />
              <Route path="catalog" element={<Catalog />} />
              <Route
                path="product-details/:productId"
                element={<ProductDetails />}
              />
              <Route path="cart" element={<Cart />} />
              <Route path="login" element={<Login />} />
              <Route
                path="confirmation/:orderId"
                element={
                  <PrivateRoute>
                    <Confirmation />
                  </PrivateRoute>
                }
              />
            </Route>

            <Route
              path="/admin/"
              element={
                <PrivateRoute roles={['ROLE_ADMIN']}>
                  <Admin />
                </PrivateRoute>
              }
            >
              <Route index element={<Navigate to="/admin/home" />} />
              <Route path="home" element={<AdminHome />} />
              <Route path="products" element={<ProductListing />} />
              <Route path="products/:productId" element={<ProductForm />} />
            </Route>

            <Route path="*" element={<Navigate to={'/'} />} />
          </Routes>
        </HistoryRouter>
      </ContextCartCount.Provider>
    </ContextToken.Provider>
  )
}
