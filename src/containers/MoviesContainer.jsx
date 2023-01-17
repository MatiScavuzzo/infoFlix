import { useContext } from 'react'
import { BtnHome } from '../components/BtnHome'
import { FilterByCategories } from '../components/FilterByCategories'
import { MediaCard } from '../components/MediaCard'
import { SortBySelector } from '../components/SortBySelector'
import { Spinner } from '../components/Spinner'
import { ApiContext } from '../contexts/ApiContext'
import { AuthContext } from '../contexts/AuthContext'
import { ThemeContext } from '../contexts/ThemeContext'
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
    const { alertHandler } = useContext(AuthContext)
    const { darkMode } = useContext(ThemeContext)
  return (
    <div className={`${darkMode ? 'dark' : 'light'} flex flex-col relative`}>
      <BtnHome />
      <div className='flex flex-col p-4 gap-4 md:flex-row items-center justify-around'>
        <input type='search' className={`${darkMode ? '' : 'border-2 text-neutral-100 border-neutral-700 bg-red-700 placeholder:text-neutral-100'} rounded-lg p-1`} onChange={onChangeHandler} placeholder='Buscar...' />
        <SortBySelector onChange={onChangeSortByHandler} className={`${darkMode ? '' : 'text-neutral-100 border-2 border-neutral-700 bg-red-700'} rounded-lg p-1`} />
      </div>
      <div className='flex w-full gap-2 items-center justify-center'>
        <FilterByCategories genresList={genresList} onChange={handlerSelect} className={`relative w-48 rounded-lg p-1 flex flex-col`} />
      </div>
      <div className='flex flex-wrap p-2 w-full'>
        {!allMovies ? 
          <Spinner /> : 
          (findMovies === undefined ? 
          allMovies.map(m =>
          m.poster_path !== null && <MediaCard linkToIsLogIn={`/movies/${m.id}`} linkToIsLogOut='/auth' onClick={alertHandler} key={m.id} id={m.id} title={m.title || m.name} imgSrc={`${IMG_URL}w185${m.poster_path}`}/>) : 
          findMovies.map(m => 
          m.poster_path !== null && <MediaCard linkToIsLogIn={`/movies/${m.id}`} linkToIsLogOut='/auth' onClick={alertHandler} key={m.id} id={m.id} title={m.title || m.name} imgSrc={`${IMG_URL}w185${m.poster_path}`}/>))}
      </div>
      <div>
        <PaginationContainer onClickMore={showMoreMoviesHandler} onClickLess={showLessMoviesHandler} />
      </div>
    </div>
  )
}