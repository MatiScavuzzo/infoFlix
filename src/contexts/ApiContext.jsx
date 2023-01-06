import React, { useEffect, useState } from 'react'

export const ApiContext = React.createContext()

export const ApiContextProvider = ({ children }) => {
  const [buttonShowLess, setButtonShowLess] = useState(false)
  const initialPage = 1
  const [checkedList, setCheckedList] = useState([])
  const byGenres = checkedList.toString()
  const [sortBy, setSortBy] = useState({ value: 'popularity.desc'})
  const [movies, setMovies] = useState([])
  const [allMovies, setAllMovies] = useState([])
  const [moviePage, setMoviePage] = useState(initialPage)
  const [movieData, setMovieData] = useState([])
  const [moviesProviders, setMoviesProviders] = useState()
  const [queryMovie, setQueryMovie] = useState('')
  const [genresList, setGenresList] = useState([])
  const [findMovies, setFindMovies] = useState([]) // Hasta acá estados para movies
  const [tvSeries, setTvSeries] = useState([])
  const [allTvSeries, setAllTvSeries] = useState([])
  const [trending, setTrending] = useState([])
  const [seriesPage, setSeriesPage] = useState(initialPage)
  const [seriesData, setSeriesData] = useState([])
  const [seriesProviders, setSeriesProviders] = useState()
  const [trendingData, setTrendingData] = useState([])
  const [trendingProviders, setTrendingProviders] = useState()
  const [querySeries, setQuerySeries] = useState('')
  const [findSeries, setFindSeries] = useState([])
  const [checkedSeriesList, setCheckedSeriesList] = useState([])
  const byGenresSeries = checkedSeriesList.toString()
  const [genresTVList, setGenresTVList] = useState([]) // Hasta acá estados para series
  const [trendingPeriod, setTrendingPeriod] = useState('day') // Estado de tendencias 
  const API_KEY = 'api_key=ec755b7b2f3cf064edd7cd1219ddcf08'
  const API_URL = 'https://api.themoviedb.org/3/'
  const DISCOVER_ALLMOVIES = `${API_URL}discover/movie?${API_KEY}&language=en-US&sort_by=${sortBy.value}&page=${moviePage}&with_genres=${byGenres}&vote_count.gte=500`
  const DISCOVER_MOVIE = `${API_URL}discover/movie?${API_KEY}&language=en-US&sort_by=popularity.desc&vote_count.gte=500`
  const DISCOVER_TVSERIES = `${API_URL}discover/tv?${API_KEY}&sort_by=popularity.desc&vote_count.gte=500`
  const DISCOVER_ALLTVSERIES = `${API_URL}discover/tv?${API_KEY}&language=en-US&sort_by=${sortBy.value}&page=${seriesPage}&with_genres=${byGenresSeries}&vote_count.gte=500`
  const TRENDING = `${API_URL}trending/all/${trendingPeriod}?${API_KEY}`
  const IMG_URL = 'https://image.tmdb.org/t/p/'
  const dayOrWeekHandler = (ev) => {
    setTrendingPeriod(ev.target.value)
  } // Tendencias
  const showMoreMoviesHandler = () => { 
    setMoviePage(moviePage+1)
    setButtonShowLess(true)
  } // Ver más Movies
  const showLessMoviesHandler = () => {
    setAllMovies([])
    setMoviePage(initialPage)
    setButtonShowLess(false)
  } // Ver menos Movies
  const showMoreSeriesHandler = () => {
    setSeriesPage(seriesPage+1)
    setButtonShowLess(true)
  } // Ver más Series
  const showLessSeriesHandler = () => {
    setAllTvSeries([])
    setSeriesPage(initialPage)
    setButtonShowLess(false)
  } // Ver menos Series
  const numberPageHandler = (ev) => {
    setMoviePage(ev.target.value)
  } // Paginador numérico que por ahora no funciona
  const onChangeHandler = (ev) => {
    if (ev.target.value.length > 2) {
      setQueryMovie(ev.target.value)
      setQuerySeries(ev.target.value)
    }
    if (ev.target.value === '') {
      setQueryMovie('')
      setQuerySeries('')
      setFindMovies([])
      setFindSeries([])
    }
  } // Cambios en buscador Movies/Series
  const onChangeSortByHandler = (ev) => {
    setAllMovies([])
    setAllTvSeries([])
    return setSortBy({value: ev.target.value});
  } // Dropdown SortBy
  const handlerSelect = (ev) => {
    const value = ev.target.value
    const isChecked = ev.target.checked
    const filteredList = checkedList.filter(item => item !== value)
    if (isChecked) {
      setCheckedList([...checkedList, value])
      setAllMovies([])
    } else {
      setCheckedList(filteredList)
      setAllMovies([])
    }
    isChecked ? setCheckedList([...checkedList, value]) : setCheckedList(filteredList)
  } // Selector Categorías Movies
  const handlerSeriesSelect = (ev) => {
    const value = ev.target.value
    const isChecked = ev.target.checked
    const filteredList = checkedSeriesList.filter(item => item !== value)
    if (isChecked) {
      setCheckedSeriesList([...checkedSeriesList, value])
      setAllTvSeries([])
    } else {
      setCheckedSeriesList(filteredList)
      setAllTvSeries([])
    }
    isChecked ? setCheckedSeriesList([...checkedSeriesList, value]) : setCheckedSeriesList(filteredList)
  } // Selector Categorías Series
  useEffect(() => {
    fetch(`${API_URL}genre/movie/list?${API_KEY}&language=es-AR`)
    .then(res => res.json())
    .then(resGenres => setGenresList(resGenres.genres))
  }, []) // Categorías Movies
  useEffect(() => {
    fetch(`${API_URL}genre/tv/list?${API_KEY}&language=es-AR`)
    .then(res => res.json())
    .then(resGenres => setGenresTVList(resGenres.genres))
  }, []) // Categorías Series
  useEffect(() => {
    fetch(`${DISCOVER_ALLMOVIES}`)
    .then(res => res.json())
    .then(resAllMovies => {allMovies == [] ? setAllMovies(resAllMovies.results) : setAllMovies(allMovies.concat(resAllMovies.results))})
  }, [DISCOVER_ALLMOVIES]) // Ver todas las Movies
  useEffect(() => {
    fetch(`${API_URL}search/movie?${API_KEY}&language=en-US&query=${queryMovie}`)
    .then(res => res.json())
    .then(resQueryMovies => setFindMovies(resQueryMovies.results))
  }, [queryMovie]) // Buscador Movies
  useEffect(() => {
    fetch(`${API_URL}search/tv?${API_KEY}&language=en-US&query=${querySeries}`)
    .then(res => res.json())
    .then(resQuerySeries => setFindSeries(resQuerySeries.results))
  }, [querySeries]) // Buscador Series
  useEffect(() => {
    fetch(`${DISCOVER_MOVIE}`)
    .then(response => response.json())
    .then(resMov => 
      setMovies(resMov.results)
      )
  }, []) // Movies Home
  useEffect(() => {
    fetch(`${DISCOVER_TVSERIES}`)
    .then(response => response.json())
    .then(resSeries => 
      setTvSeries(resSeries.results))
  }, []) // Series Home
  useEffect(() => {
    fetch(`${DISCOVER_ALLTVSERIES}`)
    .then(response => response.json())
    .then(resSeries => 
      setAllTvSeries(allTvSeries.concat(resSeries.results)))
  }, [DISCOVER_ALLTVSERIES]) // Ver todas las series
  useEffect(() => {
    fetch(`${TRENDING}`)
    .then(response => response.json())
    .then(resTrend =>
      setTrending(resTrend.results))
  }, [TRENDING]) // Tendencias
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
        showLessMoviesHandler,
        showMoreSeriesHandler,
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
        findMovies,
        onChangeSortByHandler,
        genresList,
        handlerSelect,
        checkedList,
        handlerSeriesSelect,
        genresTVList,
        findSeries
      }}>
      {children}
    </ApiContext.Provider>
  )
}