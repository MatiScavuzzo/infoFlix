import { useContext } from 'react'
import { MediaCard } from '../components/MediaCard'
import { ApiContext } from '../contexts/ApiContext'
import { PaginationContainer } from './PaginationContainer'
import { SortBySelector } from '../components/SortBySelector'
import { FilterByCategories } from '../components/FilterByCategories'
import { Spinner } from '../components/Spinner'

export const SeriesContainer = () => {
  const { showMoreSeriesHandler, findSeries, handlerSeriesSelect, onChangeHandler, onChangeSortByHandler, genresTVList, showLessSeriesHandler,allTvSeries, IMG_URL } = useContext(ApiContext)
  return (
    <div className='flex flex-col'>
      <div className='flex flex-col p-4 gap-4 md:flex-row items-center justify-around'>
        <input type='search' className='rounded-lg p-1' onChange={onChangeHandler} placeholder='Buscar...' />
        <SortBySelector onChange={onChangeSortByHandler} className='rounded-lg p-1' />
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