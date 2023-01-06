import React, { useContext } from 'react'
import { ApiContext } from '../contexts/ApiContext.jsx'
import { MediaCard } from '../components/MediaCard.jsx'
import { Spinner } from '../components/Spinner.jsx'


export const MoviesContainerHome = () => {
  const { movies, IMG_URL} = useContext(ApiContext)
  return (
    <div className='flex flex-col'>
      <div className='p-2 pb-0 text-left'><h1 className='font-black p-2'>Películas</h1></div>
      {!movies ? <Spinner />: 
      <div className='flex overflow-x-auto p-2 space-x w-full overflow-y-hidden'>
        {movies.map(m => <MediaCard linkTo={`/movies/${m.id}`} className='flex-shrink-0' key={m.id} id={m.id} title={m.title || m.name} imgSrc={`${IMG_URL}w185${m.poster_path}`}/>)}
      </div>
      }
    </div>
  )
}