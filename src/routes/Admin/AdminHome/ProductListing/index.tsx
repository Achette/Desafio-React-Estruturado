import React from 'react'
import { ProductDTO } from '@/models'
import editIcon from '../../../../assets/edit.svg'
import { useNavigate, Link } from 'react-router-dom'
import deleteIcon from '../../../../assets/delete.svg'
import * as productService from '@/services/product-service'
import {
  ButtonInverseAdmin,
  ButtonNextPageAdmin,
  DialogConfirmation,
  DialogInfo,
  SearchBar,
} from '@/components'
import './styles.css'

type QueryParams = {
  page: number
  name: string
  // size: number;
  // sort: string;
}

export const ProductListing = () => {
  const navigate = useNavigate()

  const [queryParams, setQueryParams] = React.useState<QueryParams>({
    page: 0,
    name: '',
  })

  const [products, setProducts] = React.useState<ProductDTO[]>([])

  const [isLastPage, setIsLastPage] = React.useState(false)

  const [dialogInfoData, setDialogInfoData] = React.useState({
    visible: false,
    message: 'Operação com sucesso!',
  })

  const [dialogConfirmationData, setDialogConfirmationData] = React.useState({
    visible: false,
    id: 0,
    message: 'Tem certeza?',
  })

  React.useEffect(() => {
    productService
      .findPageRequest(queryParams.page, queryParams.name)
      .then((response) => {
        const nextPage = response.data.content
        setProducts(products.concat(nextPage))
        setIsLastPage(response.data.last)
      })
  }, [queryParams])

  function handleSearch(searchText: string) {
    setProducts([])
    setQueryParams({ ...queryParams, page: 0, name: searchText })
  }

  function handleNextPageClick() {
    setQueryParams({ ...queryParams, page: queryParams.page + 1 })
  }

  function handleOnDialogInfoClose() {
    setDialogInfoData({ ...dialogInfoData, visible: false })
  }

  function handleDeleteClick(productId: number) {
    setDialogConfirmationData({
      ...dialogConfirmationData,
      id: productId,
      visible: true,
    })
  }

  function handleUpdateClick(productId: number) {
    navigate(`/admin/products/${productId}`)
  }

  function handleOnDialogConfirmationAnswer(
    answer: boolean,
    productId: number
  ) {
    if (answer) {
      productService
        .deleteById(productId)
        .then((response) => {
          setProducts([])
          setQueryParams({ ...queryParams, page: 0 })
        })
        .catch((error) => {
          setDialogInfoData({
            visible: true,
            message: error.response.data.error,
          })
        })
    }
    setDialogConfirmationData({ ...dialogConfirmationData, visible: false })
  }

  return (
    <main>
      <section id="product-listing-section" className="dsc-container">
        <h2 className="dsc-section-title dsc-mb20">Cadastro de produtos</h2>

        <div className="dsc-btn-page-container dsc-mb20">
          <Link to="/admin/products/create">
            <ButtonInverseAdmin text="Novo" />
          </Link>
        </div>

        <SearchBar onSearch={handleSearch} />

        <table className="dsc-table dsc-mb20 dsc-mt20">
          <thead>
            <tr className="dsc-tb320">
              <th className="dsc-tb576">ID</th>
              <th></th>
              <th className="dsc-tb768">Preço</th>
              <th className="dsc-txt-left">Nome</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="dsc-tb576">{product.id}</td>
                <td>
                  <img
                    className="dsc-product-listing-image"
                    src={product.imgUrl}
                    alt={product.name}
                  />
                </td>
                <td className="dsc-tb768">R$ {product.price.toFixed(2)}</td>
                <td className="dsc-txt-left">{product.name}</td>
                <td>
                  <img
                    onClick={() => handleUpdateClick(product.id)}
                    className="dsc-product-listing-btn"
                    src={editIcon}
                    alt={'Editar'}
                  />
                </td>
                <td>
                  <img
                    onClick={() => handleDeleteClick(product.id)}
                    className="dsc-product-listing-btn"
                    src={deleteIcon}
                    alt="Deletar"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!isLastPage && (
          <ButtonNextPageAdmin onNextPage={handleNextPageClick} />
        )}
      </section>
      {dialogInfoData.visible && (
        <DialogInfo
          message={dialogInfoData.message}
          onDialogClose={handleOnDialogInfoClose}
        />
      )}

      {dialogConfirmationData.visible && (
        <DialogConfirmation
          id={dialogConfirmationData.id}
          message={dialogConfirmationData.message}
          onDialogAnswer={handleOnDialogConfirmationAnswer}
        />
      )}
    </main>
  )
}
