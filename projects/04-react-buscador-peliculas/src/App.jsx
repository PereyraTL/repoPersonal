import './App.css'
import { Movies } from './components/Movies.jsx'
import { useMovies } from './hooks/useMovies.js'
import {  useCallback, useState } from 'react' 
import { useSearch } from './hooks/useSearch.js'
import debounce from 'just-debounce-it'


function App() {
  const [sort, setSort] = useState(false)

  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({search,sort})

  const debounceGetMovies = useCallback(
    debounce(search => {
      getMovies({ search })
    },500)
    ,[getMovies]
  )
  
  

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })

  }

  const handleSort = () => {
    setSort(!sort)
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
    const newSearch = event.target.value
    updateSearch(newSearch)
    debounceGetMovies(newSearch)
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
            <input type='checkbox' onChange={handleSort} checked={sort}/>
            <button type='submit'>Search</button>
          </form>
          {error && <p style={{color: 'red'}}>{error}</p>}
      </header>
      <main>
        {loading ? <p>Cargando ...</p> : <Movies movies={movies}/>}
      </main>
    </div>
  )
}

export default App
