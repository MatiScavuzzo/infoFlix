import { useContext } from 'react'
import { HiHome } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { FilterByCategories } from '../components/FilterByCategories'
import { MediaCard } from '../components/MediaCard'
import { SortBySelector } from '../components/SortBySelector'
import { Spinner } from '../components/Spinner'
import { ApiContext } from '../contexts/ApiContext'
import { ThemeContext } from '../contexts/ThemeContext'
import { PaginationContainer } from './PaginationContainer'

export const MoviesContainer = () => {
  const { 
    showMoreMoviesHandler, 
    showLessMoviesHandler,
    isScrolled,
    genresList, 
    handlerSelect, 
    onChangeSortByHandler, 
    onChangeHandler, 
    findMovies, 
    allMovies, 
    IMG_URL } = useContext(ApiContext)
    const { darkMode } = useContext(ThemeContext)
  return (
    <div className={`${darkMode ? 'dark' : 'light'} flex flex-col relative`}>
      <div className='absolute top-4 left-2'>
        <button className={`${isScrolled} bg-slate-500 fixed z-20 rounded-full`}><Link to='/'><HiHome className='p-2 w-10 h-10'/></Link></button>
      </div>
      <div className='flex flex-col p-4 gap-4 md:flex-row items-center justify-around'>
        <input type='search' className='rounded-lg p-1' onChange={onChangeHandler} placeholder='Buscar...' />
        <SortBySelector onChange={onChangeSortByHandler} className='rounded-lg p-1' />
      </div>
      <div className='flex w-full gap-2 items-center justify-center'>
        <FilterByCategories genresList={genresList} onChange={handlerSelect} className='relative w-48 rounded-lg p-1 flex flex-col' />
      </div>
      <div className='flex flex-wrap p-2 w-full'>
        {!allMovies ? 
          <Spinner /> : 
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