import './styles.css'

type Props = {
  text: string
}

export const ButtonPrimary = ({ text }: Props) => {
  return <div className="dsc-btn dsc-btn-primary">{text}</div>
}
