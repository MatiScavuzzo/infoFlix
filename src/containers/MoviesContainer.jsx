import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { MediaCard } from '../components/MediaCard'
import { ApiContext } from '../contexts/ApiContext'
import { PaginationContainer } from './PaginationContainer'

export const MoviesContainer = () => {
  const { showMoreMoviesHandler, showLessMoviesHandler, onChangeHandler, findMovies, allMovies, IMG_URL } = useContext(ApiContext)
  return (
    <div className='flex flex-col'>
      <div className='flex p-4'>
        <input onChange={onChangeHandler} type='text' placeholder='Buscar...' />
      </div>
      <div className='flex flex-wrap p-2 w-full'>
        {!allMovies ? 
          <h1>Cargando...</h1> : 
          (findMovies === undefined ? 
          allMovies.map(m => 
          <MediaCard linkTo={`/movies/${m.id}`} key={m.id} id={m.id} title={m.title || m.name} imgSrc={`${IMG_URL}w185${m.poster_path}`}/>) : 
          findMovies.map(m => 
          <MediaCard linkTo={`/movies/${m.id}`} key={m.id} id={m.id} title={m.title || m.name} imgSrc={`${IMG_URL}w185${m.poster_path}`}/>))}
      </div>
      <div>
        <PaginationContainer onClickMore={showMoreMoviesHandler} onClickLess={showLessMoviesHandler} />
      </div>
    </div>
  )
}