import React, { useContext } from 'react'
import { ApiContext } from '../contexts/ApiContext.jsx'
import { MediaCard } from '../components/MediaCard.jsx'


export const SeriesContainerHome = () => {
  const {tvSeries, IMG_URL} = useContext(ApiContext)
  return (
    <div className='flex flex-col'>
      <div className='p-2 pb-0 text-left'><h1 className='font-black p-2'>Series</h1></div>
      {!tvSeries ? <h1>Cargando...</h1> : 
      <div className='flex overflow-x-auto p-2 space-x w-full overflow-y-hidden'>
        {tvSeries.map(s => <MediaCard linkTo={`/series/${s.id}`} className='flex-shrink-0' key={s.id} id={s.id} title={s.title || s.name} imgSrc={`${IMG_URL}w185${s.poster_path}`}/>)}
      </div>
      }
    </div>
  )
}