import { useContext } from 'react'
import { MediaCard } from '../components/MediaCard'
import { ApiContext } from '../contexts/ApiContext'
import { PaginationContainer } from './PaginationContainer'
import { SortBySelector } from '../components/SortBySelector'
import { FilterByCategories } from '../components/FilterByCategories'
import { Spinner } from '../components/Spinner'
import { ThemeContext } from '../contexts/ThemeContext'
import { BtnHome } from '../components/BtnHome'

export const SeriesContainer = () => {
  const { darkMode } = useContext(ThemeContext)
  const { showMoreSeriesHandler, isScrolled, findSeries, handlerSeriesSelect, onChangeHandler, onChangeSortByHandler, genresTVList, showLessSeriesHandler,allTvSeries, IMG_URL } = useContext(ApiContext)
  return (
    <div className={`${darkMode ? 'dark' : 'light'} flex flex-col relative`}>
      <BtnHome />
      <div className='flex flex-col p-4 gap-4 md:flex-row items-center justify-around'>
        <input type='search' className={`${darkMode ? '' : 'border-2 text-neutral-100 border-neutral-700 bg-red-700 placeholder:text-neutral-100'} rounded-lg p-1`} onChange={onChangeHandler} placeholder='Buscar...' />
        <SortBySelector onChange={onChangeSortByHandler} className={`${darkMode ? '' : 'text-neutral-100 border-2 border-neutral-700 bg-red-700'} rounded-lg p-1`} />
      </div>
      <div className='flex w-full gap-2 items-center justify-center'>
        <FilterByCategories genresList={genresTVList} onChange={handlerSeriesSelect} className='relative w-48 rounded-lg p-1 flex flex-col' />
      </div>
      <div className='flex flex-wrap p-2 w-full'>
      {!allTvSeries ? 
          <Spinner /> : 
          (findSeries === undefined ? 
          allTvSeries.map(s =>
          s.poster_path !== null && <MediaCard linkTo={`/series/${s.id}`} key={s.id} id={s.id} title={s.title || s.name} imgSrc={`${IMG_URL}w185${s.poster_path}`}/>) : 
          findSeries.map(s => 
          s.poster_path !== null && <MediaCard linkTo={`/series/${s.id}`} key={s.id} id={s.id} title={s.title || s.name} imgSrc={`${IMG_URL}w185${s.poster_path}`}/>))}
      </div>
      <div>
        <PaginationContainer onClickMore={showMoreSeriesHandler} onClickLess={showLessSeriesHandler} />
      </div>
    </div>
  )
}