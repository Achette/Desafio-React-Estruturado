import React from 'react'
import './styles.css'

type Props = {
  onSearch: (arg: string) => void
}

export const SearchBar = ({ onSearch }: Props) => {
  const [text, setText] = React.useState('')

  function handleSubmit(event: any) {
    event.preventDefault()
    onSearch(text)
  }

  function handleChange(event: any) {
    setText(event.target.value)
  }

  function handleResetClick() {
    setText('')
    onSearch(text)
  }

  return (
    <form className="dsc-search-bar" onSubmit={handleSubmit}>
      <button type="submit">🔎︎</button>
      <input
        value={text}
        onChange={handleChange}
        type="text"
        placeholder="Nome do produto"
      />
      <button onClick={handleResetClick}>X</button>
    </form>
  )
}
