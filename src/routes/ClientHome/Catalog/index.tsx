import React from 'react'
import { ProductDTO } from '@/models'
import * as productService from '@/services/product-service'
import { ButtonNextPage, CatalogCard, SearchBar } from '@/components'
import './styles.css'

type QueryParams = {
  page: number
  name: string
  size?: number
  sort?: string
}

export default function Catalog() {
  const [products, setProducts] = React.useState<ProductDTO[]>([])

  const [queryParams, setQueryParams] = React.useState<QueryParams>({
    page: 0,
    name: '',
  })

  const [isLastPage, setIsLastPage] = React.useState(false)

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

  return (
    <>
      <main>
        <section id="catalog-section" className="dsc-container">
          <SearchBar onSearch={handleSearch} />
          <div className="dsc-catalog-cards dsc-mb20 dsc-mt20">
            {products.map((product) => (
              <CatalogCard key={product.id} product={product} />
            ))}
          </div>

          {!isLastPage && <ButtonNextPage onNextPage={handleNextPageClick} />}
        </section>
      </main>
    </>
  )
}
