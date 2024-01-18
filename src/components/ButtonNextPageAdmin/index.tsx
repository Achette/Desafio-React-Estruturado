import './styles.css'

type Props = {
  onNextPage: Function
}

export const ButtonNextPageAdmin = ({ onNextPage }: Props) => {
  return (
    <div onClick={() => onNextPage()} className="dsc-btn-next-page-admin">
      Carregar mais
    </div>
  )
}
