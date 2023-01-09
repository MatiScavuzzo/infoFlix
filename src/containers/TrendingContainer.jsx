import { useContext } from 'react'
import { HiHome } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { MediaCard } from '../components/MediaCard'
import { Spinner } from '../components/Spinner'
import { ApiContext } from '../contexts/ApiContext'

export const TrendingContainer = () => {
  const { trending, isScrolled, IMG_URL, dayOrWeekHandler } = useContext(ApiContext)
  return (
    <div className='flex flex-col gap-2 relative'>
      <div className='absolute top-4 left-2'>
        <button className={`${isScrolled} bg-slate-500 fixed z-20 rounded-full`}><Link to='/'><HiHome className='p-2 w-10 h-10'/></Link></button>
      </div>
      <div className='flex items-center flex-col gap-4 p-2'>
        <div><h2 className='pt-2 font-black'>Destacados</h2></div>
        <div className='flex gap-2'>
          <Button onClick={dayOrWeekHandler} value='day'>Día</Button>
          <Button onClick={dayOrWeekHandler} value='week'>Semana</Button>
        </div>
      </div>
      <div className='flex flex-wrap p-2 w-full'>
        {!trending ? <Spinner /> : trending.map(t => <MediaCard linkTo={t.media_type === 'movie' ? `/movies/${t.id}` : `/series/${t.id}`} key={t.id} id={t.id} title={t.title || t.name} imgSrc={`${IMG_URL}w185${t.poster_path}`}/>)}
      </div>
    </div>
  )
}