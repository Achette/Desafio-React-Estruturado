import React from 'react'

export type ContextCartCountType = {
  contextCartCount: number
  setContextCartCount: (contextCartCount: number) => void
}

export const ContextCartCount = React.createContext<ContextCartCountType>({
  contextCartCount: 0,
  setContextCartCount: () => {},
})
