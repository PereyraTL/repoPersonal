import { useState, createContext } from 'react'

// Paso 1: crear el contexto
export const FiltersContext = createContext()

// Paso 2: crear el provider, para proveer el contexto

export function FiltersProvider ({ children }) {
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0
  })

  return (
    <FiltersContext.Provider value={{
      filters,
      setFilters
    }}
    >
      {children}
    </FiltersContext.Provider>
  )
}
