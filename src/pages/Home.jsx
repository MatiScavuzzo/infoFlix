import { MoviesContainerHome } from '../containers/MoviesContainerHome'
import { SeriesContainerHome } from '../containers/SeriesContainerHome'
import { TrendingContainerHome } from '../containers/TrendingContainerHome'

export const Home = () => {
  return (
    <>
      <MoviesContainerHome />
      <SeriesContainerHome />
      <TrendingContainerHome />
    </>
  )
}
