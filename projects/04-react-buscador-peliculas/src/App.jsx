import './App.css'
import { Movies } from './components/Movies.jsx'
import { useMovies } from './hooks/useMovies.js'
import { useEffect, useState, useRef } from 'react' 


export function useSearch () {
  const [search, updateSearch] = useState('') 
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {

    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una película vacía')
      return
    }
    if (search.length < 3) {
      setError('Escribe al menos 3 caracteres')
      return
    }
    setError(null)
  },[search])

  return { search, updateSearch, error }
}



function App() {
  const { movies } = useMovies()
  const { search, updateSearch, error } = useSearch()
  

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log({search})

  }

  /*
  const handleSubmit = (event) => {
    evet.preventDefault()
    const fields = Object.fromEntries(new window.FormData(event.target))
    console.log(fields)
  }
  recuperar form de manera no controlada
  */

  const handleChange = (event) => {
    updateSearch(event.target.value)
  }

  

  return (
    <div className='page'>
      <header>
        <h1>Buscador de Películas</h1>
          <form className='form' onSubmit={handleSubmit}>
            <input
              style={{
                border: '1px solid transparent',
                borderColor: error ? 'red' : 'transparent'
              }} onChange={handleChange} value={search} name='query' placeholder='Avengers, 
              Star Wars, The Matrix ...'
            />
            <button type='submit'>Search</button>
          </form>
          {error && <p style={{color: 'red'}}>{error}</p>}
      </header>
      <main>
        <Movies movies={movies}/>
      </main>
    </div>
  )
}

export default App
