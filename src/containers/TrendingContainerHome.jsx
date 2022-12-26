import React, { useContext } from 'react'
import { ApiContext } from '../contexts/ApiContext.jsx'
import { MediaCard } from '../components/MediaCard.jsx'


export const TrendingContainerHome = () => {
  const {trending, IMG_URL} = useContext(ApiContext)
  return (
    <div className='flex flex-col'>
      <div className='p-2 pb-0 text-left'><h1 className='font-black p-2'>Tendencias del día</h1></div>
      {!trending ? <h1>Cargando...</h1> : 
      <div className='flex overflow-x-auto p-2 space-x w-full overflow-y-hidden'>
        {trending.map(t => <MediaCard linkTo={t.media_type === 'movie' ? `/movies/${t.id}` : `/series/${t.id}`} className='flex-shrink-0' key={t.id} id={t.id} title={t.title || t.name} imgSrc={`${IMG_URL}w185${t.poster_path}`}/>)}
      </div>
      }
    </div>
  )
}