import { useContext } from 'react'
import { MoviesContainerHome } from '../containers/MoviesContainerHome'
import { SeriesContainerHome } from '../containers/SeriesContainerHome'
import { TrendingContainerHome } from '../containers/TrendingContainerHome'
import { ThemeContext } from '../contexts/ThemeContext'

export const Home = () => {
  const { darkMode } = useContext(ThemeContext)
  return (
    <main className={`${darkMode ? 'dark' : 'light'} flex flex-col`}>
      <section className='flex flex-col'>
      <MoviesContainerHome />
      <SeriesContainerHome />
      <TrendingContainerHome />
    </section>
    </main>
  )
}
