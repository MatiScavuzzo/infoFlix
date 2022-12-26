import { useContext } from 'react'
import { MediaCard } from '../components/MediaCard'
import { ApiContext } from '../contexts/ApiContext'
import { PaginationContainer } from './PaginationContainer'

export const SeriesContainer = () => {
  const { showMoreSeriesHandler, showLessSeriesHandler,allTvSeries, IMG_URL } = useContext(ApiContext)
  return (
    <div className='flex flex-col'>
      <div className='flex flex-wrap p-2 w-full'>
        {!allTvSeries ? <h1>Cargando...</h1> : allTvSeries.map(s => <MediaCard linkTo={`/series/${s.id}`} key={s.id} id={s.id} title={s.title || s.name} imgSrc={`${IMG_URL}w185${s.poster_path}`}/>)}
      </div>
      <div>
        <PaginationContainer onClickMore={showMoreSeriesHandler} onClickLess={showLessSeriesHandler} />
      </div>
    </div>
  )
}