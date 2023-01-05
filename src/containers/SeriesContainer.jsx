import { useContext } from 'react'
import { MediaCard } from '../components/MediaCard'
import { ApiContext } from '../contexts/ApiContext'
import { PaginationContainer } from './PaginationContainer'
import { SortBySelector } from '../components/SortBySelector'
import { FilterByCategories } from '../components/FilterByCategories'

export const SeriesContainer = () => {
  const { showMoreSeriesHandler, handlerSeriesSelect, onChangeHandler, onChangeSortByHandler, genresTVList, showLessSeriesHandler,allTvSeries, IMG_URL } = useContext(ApiContext)
  return (
    <div className='flex flex-col'>
      <div className='flex p-4 gap-2 items-center justify-around'>
        <input type='search' className='rounded-lg p-1' onChange={onChangeHandler} placeholder='Buscar...' />
        <SortBySelector onChange={onChangeSortByHandler} className='rounded-lg p-1' />
      </div>
      <div className='flex w-full gap-2 items-center justify-center'>
        <FilterByCategories genresList={genresTVList} onChange={handlerSeriesSelect} className='rounded-lg p-1 flex flex-col' />
      </div>
      <div className='flex flex-wrap p-2 w-full'>
        {!allTvSeries ? <h1>Cargando...</h1> : allTvSeries.map(s => <MediaCard linkTo={`/series/${s.id}`} key={s.id} id={s.id} title={s.title || s.name} imgSrc={`${IMG_URL}w185${s.poster_path}`}/>)}
      </div>
      <div>
        <PaginationContainer onClickMore={showMoreSeriesHandler} onClickLess={showLessSeriesHandler} />
      </div>
    </div>
  )
}