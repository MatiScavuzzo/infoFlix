import { createBrowserRouter, useParams } from 'react-router-dom'
import { LayoutPublic } from '../layouts/LayoutPublic'
import { Movies } from '../pages/Movies'
import { Home } from '../pages/Home'
import { NotFound } from '../pages/NotFound'
import { Trending } from '../pages/Trending'
import { Series } from '../pages/Series'
import { MovieDetail } from '../pages/MovieDetail'
import { SeriesDetail } from '../pages/SeriesDetail'
import { Auth } from '../pages/Auth'


export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPublic />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/movies',
        element: <Movies />,
      },
      {
        path: '/movies/:movieId',
        element: <MovieDetail />
      },
      {
        path: '/series',
        element: <Series />
      },
      {
        path: '/series/:serieId',
        element: <SeriesDetail />
      },
      {
        path: '/trending',
        element: <Trending />
      },
      {
        path: '/auth',
        element: <Auth />
      }
    ]
  }
])
