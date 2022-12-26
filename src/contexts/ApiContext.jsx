import React, { useEffect, useState } from 'react'

export const ApiContext = React.createContext()

export const ApiContextProvider = ({ children }) => {
  const [buttonShowLess, setButtonShowLess] = useState(false)
  const [movies, setMovies] = useState([])
  const [allMovies, setAllMovies] = useState([])
  const [tvSeries, setTvSeries] = useState([])
  const [allTvSeries, setAllTvSeries] = useState([])
  const [trending, setTrending] = useState([])
  const initialPage = 1
  const [moviePage, setMoviePage] = useState(initialPage)
  const [seriesPage, setSeriesPage] = useState(initialPage)
  const [trendingPeriod, setTrendingPeriod] = useState('day')
  const [sortBy, setSortBy] = useState('popularity.desc')
  const [movieData, setMovieData] = useState([])
  const [moviesProviders, setMoviesProviders] = useState()
  const [seriesData, setSeriesData] = useState([])
  const [seriesProviders, setSeriesProviders] = useState()
  const [trendingData, setTrendingData] = useState([])
  const [trendingProviders, setTrendingProviders] = useState()
  const [queryMovie, setQueryMovie] = useState('')
  const [findMovies, setFindMovies] = useState([])
  const API_KEY = 'api_key=ec755b7b2f3cf064edd7cd1219ddcf08'
  const API_URL = 'https://api.themoviedb.org/3/'
  const DISCOVER_ALLMOVIES = `${API_URL}discover/movie?${API_KEY}&language=en-US&sort_by=${sortBy}&page=${moviePage}&vote_count.gte=500`
  const DISCOVER_MOVIE = `${API_URL}discover/movie?${API_KEY}&language=en-US&sort_by=popularity.desc&vote_count.gte=500`
  const DISCOVER_TVSERIES = `${API_URL}discover/tv?${API_KEY}&sort_by=popularity.desc&vote_count.gte=500`
  const DISCOVER_ALLTVSERIES = `${API_URL}discover/tv?${API_KEY}&language=en-US&sort_by=${sortBy}&page=${seriesPage}&vote_count.gte=500`
  const TRENDING = `${API_URL}trending/all/${trendingPeriod}?${API_KEY}`
  const IMG_URL = 'https://image.tmdb.org/t/p/'
  const dayOrWeekHandler = (ev) => {
    setTrendingPeriod(ev.target.value)
  }
  const showMoreMoviesHandler = () => {
    setMoviePage(moviePage+1)
    setButtonShowLess(true)
  }
  const showMoreSeriesHandler = () => {
    setSeriesPage(seriesPage+1)
    setButtonShowLess(true)
  }
  const showLessMoviesHandler = () => {
    setAllMovies([])
    setMoviePage(initialPage)
    setButtonShowLess(false)
  }
  const showLessSeriesHandler = () => {
    setAllTvSeries([])
    setSeriesPage(initialPage)
    setButtonShowLess(false)
  }
  const numberPageHandler = (ev) => {
    setMoviePage(ev.target.value)
  }
  const onChangeHandler = (ev) => {
    if (ev.target.value.length > 2) {
      setQueryMovie(ev.target.value)
    }
    if (ev.target.value === '') {
      setQueryMovie('')
      setFindMovies([])
    }
    if (queryMovie === '') {
      setFindMovies([])
    }
  }
  useEffect(() => {
    fetch(`${DISCOVER_ALLMOVIES}`)
    .then(res => res.json())
    .then(resAllMovies => setAllMovies(allMovies.concat(resAllMovies.results)))
  }, [DISCOVER_ALLMOVIES, moviePage])
  useEffect(() => {
    fetch(`${API_URL}search/movie?${API_KEY}&language=en-US&query=${queryMovie}`)
    .then(res => res.json())
    .then(resQueryMovies => setFindMovies(resQueryMovies.results))
  }, [queryMovie])
  useEffect(() => {
    fetch(`${DISCOVER_MOVIE}`)
    .then(response => response.json())
    .then(resMov => 
      setMovies(resMov.results)
      )
  }, [])
  useEffect(() => {
    fetch(`${DISCOVER_TVSERIES}`)
    .then(response => response.json())
    .then(resSeries => 
      setTvSeries(resSeries.results))
  }, [])
  useEffect(() => {
    fetch(`${DISCOVER_ALLTVSERIES}`)
    .then(response => response.json())
    .then(resSeries => 
      setAllTvSeries(allTvSeries.concat(resSeries.results)))
  }, [DISCOVER_ALLTVSERIES, seriesPage])
  useEffect(() => {
    fetch(`${TRENDING}`)
    .then(response => response.json())
    .then(resTrend =>
      setTrending(resTrend.results))
  }, [TRENDING])
  return (
    <ApiContext.Provider value={
      {
        movies,
        allMovies,
        tvSeries,
        allTvSeries,
        trending,
        API_URL,
        API_KEY,
        IMG_URL,
        buttonShowLess,
        dayOrWeekHandler,
        showMoreMoviesHandler,
        showMoreSeriesHandler,
        showLessMoviesHandler,
        showLessSeriesHandler,
        numberPageHandler,
        movieData,
        setMovieData,
        moviesProviders,
        setMoviesProviders,
        seriesData,
        setSeriesData,
        seriesProviders,
        setSeriesProviders,
        trendingData,
        setTrendingData,
        trendingProviders,
        setTrendingProviders,
        onChangeHandler,
        findMovies
      }}>
      {children}
    </ApiContext.Provider>
  )
}