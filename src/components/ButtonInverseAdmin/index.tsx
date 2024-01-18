import './styles.css'

type Props = {
  text: string
}

export const ButtonInverseAdmin = ({ text }: Props) => {
  return <div className="dsc-btn dsc-btn-inverse-admin">{text}</div>
}
