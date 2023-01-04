import { useContext } from 'react'
import { FilterByCategories } from '../components/FilterByCategories'
import { MediaCard } from '../components/MediaCard'
import { SortBySelector } from '../components/SortBySelector'
import { ApiContext } from '../contexts/ApiContext'
import { PaginationContainer } from './PaginationContainer'

export const MoviesContainer = () => {
  const { 
    showMoreMoviesHandler, 
    showLessMoviesHandler, 
    genresList, 
    handlerSelect, 
    onChangeSortByHandler, 
    onChangeHandler, 
    findMovies, 
    allMovies, 
    IMG_URL } = useContext(ApiContext)
  return (
    <div className='flex flex-col'>
      <div className='flex p-4 gap-2 items-center justify-around'>
        <input type='search' className='rounded-lg p-1' onChange={onChangeHandler} placeholder='Buscar...' />
        <SortBySelector onChange={onChangeSortByHandler} className='rounded-lg p-1' />
      </div>
      <div className='flex w-full gap-2 items-center justify-center'>
        <FilterByCategories genresList={genresList} onChange={handlerSelect} className='rounded-lg p-1 flex flex-col' />
      </div>
      <div className='flex flex-wrap p-2 w-full'>
        {!allMovies ? 
          <h1>Cargando...</h1> : 
          (findMovies === undefined ? 
          allMovies.map(m =>
          m.poster_path !== null && <MediaCard linkTo={`/movies/${m.id}`} key={m.id} id={m.id} title={m.title || m.name} imgSrc={`${IMG_URL}w185${m.poster_path}`}/>) : 
          findMovies.map(m => 
          m.poster_path !== null && <MediaCard linkTo={`/movies/${m.id}`} key={m.id} id={m.id} title={m.title || m.name} imgSrc={`${IMG_URL}w185${m.poster_path}`}/>))}
      </div>
      <div>
        <PaginationContainer onClickMore={showMoreMoviesHandler} onClickLess={showLessMoviesHandler} />
      </div>
    </div>
  )
}