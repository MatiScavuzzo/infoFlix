import { useContext } from 'react'
import Button from '../components/Button'
import { MoviesContainerHome } from '../containers/MoviesContainerHome'
import { SeriesContainerHome } from '../containers/SeriesContainerHome'
import { TrendingContainerHome } from '../containers/TrendingContainerHome'
import { ThemeContext } from '../contexts/ThemeContext'
import { ApiContext } from '../contexts/ApiContext'

export const Home = () => {
  const { darkMode } = useContext(ThemeContext)
  const { getAccountIdHandler } = useContext(ApiContext)
  return (
    <main className={`${darkMode ? 'dark' : 'light'} flex flex-col`}>
      <section className='p-2 flex items-center justify-center'>
        <Button className='p-2' onClick={getAccountIdHandler}>Obtener Session ID</Button>
      </section>
      <section className='flex flex-col'>
      <MoviesContainerHome />
      <SeriesContainerHome />
      <TrendingContainerHome />
    </section>
    </main>
  )
}
