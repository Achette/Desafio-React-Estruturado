import './styles.css'

type Props = {
  text: string
}

export const ButtonInverse = ({ text }: Props) => {
  return <div className="dsc-btn dsc-btn-inverse">{text}</div>
}
