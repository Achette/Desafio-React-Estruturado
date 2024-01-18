import './styles.css'

type Props = {
  text: string
}

export const ButtonPrimaryAdmin = ({ text }: Props) => {
  return <div className="dsc-btn dsc-btn-primary-admin">{text}</div>
}
