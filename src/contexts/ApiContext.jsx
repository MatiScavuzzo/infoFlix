import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'

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
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTabFilm, setSelectedTabFilm] = useState('')
  const [selectedTabSeries, setSelectedTabSeries] = useState('')
  const [selectedTabTrending, setSelectedTabTrending] = useState('')
  const [isScrolled, setIsScrolled] = useState('')
  const [requestToken, setRequestToken] = useState('')
  const [tokenApproved, setTokenApproved] = useState(false)
  const [accountId, setAccountId] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const {getDB, dataBase, insertData} = useContext(AuthContext)

  
  const API_KEY = 'api_key=ec755b7b2f3cf064edd7cd1219ddcf08'
  const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYzc1NWI3YjJmM2NmMDY0ZWRkN2NkMTIxOWRkY2YwOCIsInN1YiI6IjYzODYxYzRjMjI5YWUyMTU1YzU0NzViMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.52fuwv4zFQRdxnnmPi3FsjqZR6kiq1NNV71bYdD9V1M'
  const API_URL = 'https://api.themoviedb.org/4/'
  const API_URL_V3 = 'https://api.themoviedb.org/3/'
  const DISCOVER_ALLMOVIES = `${API_URL}discover/movie?${API_KEY}&language=en-US&sort_by=${sortBy.value}&page=${moviePage}&with_genres=${byGenres}&vote_count.gte=500`
  const DISCOVER_MOVIE = `${API_URL}discover/movie?${API_KEY}&language=en-US&sort_by=popularity.desc&vote_count.gte=500`
  const DISCOVER_TVSERIES = `${API_URL}discover/tv?${API_KEY}&sort_by=popularity.desc&vote_count.gte=500`
  const DISCOVER_ALLTVSERIES = `${API_URL}discover/tv?${API_KEY}&language=en-US&sort_by=${sortBy.value}&page=${seriesPage}&with_genres=${byGenresSeries}&vote_count.gte=500`
  const TRENDING = `${API_URL_V3}trending/all/${trendingPeriod}?${API_KEY}`
  const IMG_URL = 'https://image.tmdb.org/t/p/'
  const REQUEST_TOKEN = `${API_URL}auth/request_token`
  const AUTH_TOKEN = `${API_URL}auth/access_token`
  const APPROVE_TOKEN = `https://www.themoviedb.org/auth/access?request_token=${requestToken}`
  const GET_METHOD_REQUEST = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json;charset=utf-8',
      authorization: `Bearer ${BEARER_TOKEN}`
    }
  }
  const postMethodRequest = (data) => {
    return {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json;charset=utf-8',
        authorization: `Bearer ${BEARER_TOKEN}`
      },
      body: JSON.stringify(data)
    }
  }

  
  useEffect(() => {
    const getRequestToken = window.localStorage.getItem('requestToken')
    const redirectTo = {redirect_to: 'http://localhost:8080/auth'}
    if (getRequestToken) {
      setRequestToken(getRequestToken)
    } else {
      fetch(REQUEST_TOKEN, postMethodRequest(redirectTo))
        .then((res) => res.json())
        .then((data) => {
          setRequestToken(data.request_token)
          window.localStorage.setItem('requestToken', data.request_token)
        })
        .catch((error) => {
          console.log(error)
        });
    }  
    }, [])

  const getAccountIdHandler = () => {
    const getRequestToken = window.localStorage.getItem('requestToken')
    if (getRequestToken) {
      const rT = {request_token: getRequestToken}
      fetch(`${API_URL}auth/access_token`, postMethodRequest(rT))
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setAccountId(data.account_id)
        window.localStorage.removeItem('requestToken')
        window.sessionStorage.setItem('accountId', data.account_id)
      })
      .catch(error => console.log(error))
    }
  }

  const onChangeUserNameHandler = (ev) => {
    setUserName(ev.target.value)
  }
  const onChangePasswordHandler = (ev) => {
    setPassword(ev.target.value)
  }

  const onSubmitGetAccountIdHandler = () => {
    getDB()
    const user = {
      account_id: accountId,
      username: userName,
      password: password
    }
    if (accountId !== '') {
      if (dataBase == []) {
        if (user.username === '' || user.password === '') {
          alert('Debe completar todos los campos para enviarlos')
        } else {
          insertData(user)
        }
      } else if (dataBase[0].username === userName) {
        alert('Ya tenemos un usuario registrado con ese nombre, elige otro por favor')
      } else {
        insertData(user)
      }
    }
  }
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
  const isOpenHandler = () => {
    setIsOpen(!isOpen)
  }
  const tabHandler = (ev) => {
    switch (ev.target.value) {
      case 'films':
        setSelectedTabFilm('underline decoration-4 underline-offset-4 decoration-red-600/60 md:decoration-white')
        setSelectedTabSeries('')
        setSelectedTabTrending('')
        break;
      case 'series':
        setSelectedTabFilm('')
        setSelectedTabSeries('underline decoration-4 underline-offset-4 decoration-red-600/60 md:decoration-white')
        setSelectedTabTrending('')
        break;
      case 'trending':
        setSelectedTabFilm('')
        setSelectedTabSeries('')
        setSelectedTabTrending('underline decoration-4 underline-offset-4 decoration-red-600/60 md:decoration-white')
        break
      default: 
        setSelectedTabFilm('')
        setSelectedTabSeries('')
        setSelectedTabTrending('')
        break;
    }
  }
  const toHomeHandler = () => {
    setSelectedTabFilm('')
    setSelectedTabSeries('')
    setSelectedTabTrending('')
  }
  
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY>50 && window.scrollY<90) {
        setIsScrolled('opacity-50')
      } else if (window.scrollY>=90 && window.scrollY<140) {
        setIsScrolled('opacity-40')
      } else if (window.scrollY>=140 && window.scrollY<150) {
        setIsScrolled('opacity-30')
      } else if (window.scrollY>=150) {
        setIsScrolled('hidden')
      } else {
        setIsScrolled('')
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])
  useEffect(() => {
    fetch(`${API_URL_V3}genre/movie/list?${API_KEY}&language=es-AR`, GET_METHOD_REQUEST)
    .then(res => res.json())
    .then(resGenres => setGenresList(resGenres.genres))
  }, []) // Categorías Movies
  useEffect(() => {
    fetch(`${API_URL_V3}/genre/tv/list?${API_KEY}&language=es-AR`, GET_METHOD_REQUEST)
    .then(res => res.json())
    .then(resGenres => setGenresTVList(resGenres.genres))
  }, []) // Categorías Series
  useEffect(() => {
    fetch(DISCOVER_ALLMOVIES, GET_METHOD_REQUEST)
    .then(res => res.json())
    .then(resAllMovies => {allMovies == [] ? setAllMovies(resAllMovies.results) : setAllMovies(allMovies.concat(resAllMovies.results))})
  }, [DISCOVER_ALLMOVIES]) // Ver todas las Movies
  useEffect(() => {
    fetch(`${API_URL}search/movie?${API_KEY}&language=en-US&query=${queryMovie}`, GET_METHOD_REQUEST)
    .then(res => res.json())
    .then(resQueryMovies => setFindMovies(resQueryMovies.results))
  }, [queryMovie]) // Buscador Movies
  useEffect(() => {
    fetch(`${API_URL}search/tv?${API_KEY}&language=en-US&query=${querySeries}`, GET_METHOD_REQUEST)
    .then(res => res.json())
    .then(resQuerySeries => setFindSeries(resQuerySeries.results))
  }, [querySeries]) // Buscador Series
  useEffect(() => {
    fetch(DISCOVER_MOVIE, GET_METHOD_REQUEST)
    .then(response => response.json())
    .then(resMov => 
      setMovies(resMov.results)
      )
  }, []) // Movies Home
  useEffect(() => {
    fetch(DISCOVER_TVSERIES, GET_METHOD_REQUEST)
    .then(response => response.json())
    .then(resSeries => 
      setTvSeries(resSeries.results))
  }, []) // Series Home
  useEffect(() => {
    fetch(DISCOVER_ALLTVSERIES, GET_METHOD_REQUEST)
    .then(response => response.json())
    .then(resSeries => 
      setAllTvSeries(allTvSeries.concat(resSeries.results)))
  }, [DISCOVER_ALLTVSERIES]) // Ver todas las series
  useEffect(() => {
    fetch(TRENDING, GET_METHOD_REQUEST)
    .then(response => response.json())
    .then(resTrend =>
      setTrending(resTrend.results))
  }, [TRENDING]) // Tendencias
  return (
    <ApiContext.Provider value={
      {
        movies,
        allMovies,
        movieData,
        moviesProviders,
        findMovies,
        genresList,
        checkedList,
        tvSeries,
        allTvSeries,
        seriesData,
        seriesProviders,
        genresTVList,
        findSeries,
        trending,
        trendingData,
        trendingProviders,
        API_URL_V3,
        API_KEY,
        IMG_URL,
        APPROVE_TOKEN,
        GET_METHOD_REQUEST,
        buttonShowLess,
        isOpen,
        selectedTabFilm,
        selectedTabSeries,
        selectedTabTrending,
        isScrolled,
        requestToken,
        tokenApproved,
        accountId,
        dayOrWeekHandler,
        showMoreMoviesHandler,
        showLessMoviesHandler,
        showMoreSeriesHandler,
        showLessSeriesHandler,
        numberPageHandler,
        setMovieData,
        setMoviesProviders,
        setSeriesData,
        setSeriesProviders,
        setTrendingData,
        setTrendingProviders,
        onChangeHandler,
        onChangeSortByHandler,
        handlerSelect,
        handlerSeriesSelect,
        isOpenHandler,
        tabHandler,
        toHomeHandler,
        getAccountIdHandler,
        onChangeUserNameHandler,
        onChangePasswordHandler,
        onSubmitGetAccountIdHandler
      }}>
      {children}
    </ApiContext.Provider>
  )
}