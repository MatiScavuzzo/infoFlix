import React, { useEffect, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

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
  const [isLogIn, setIsLogIn] = useState(false)
  const [selectedTabFilm, setSelectedTabFilm] = useState('')
  const [selectedTabSeries, setSelectedTabSeries] = useState('')
  const [selectedTabTrending, setSelectedTabTrending] = useState('')
  const [isScrolled, setIsScrolled] = useState('')
  const [mailTo, setMailTo] = useState('')
  const [message, setMessage] = useState('')
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [repPassword, setRepPassword] = useState('')
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [signUpForm, setSignUpForm] = useState(false)
  const [signInForm, setSignInForm] = useState(true)
  
  const API_KEY = 'api_key=ec755b7b2f3cf064edd7cd1219ddcf08'
  const API_URL = 'https://api.themoviedb.org/3/'
  const DISCOVER_ALLMOVIES = `${API_URL}discover/movie?${API_KEY}&language=en-US&sort_by=${sortBy.value}&page=${moviePage}&with_genres=${byGenres}&vote_count.gte=500`
  const DISCOVER_MOVIE = `${API_URL}discover/movie?${API_KEY}&language=en-US&sort_by=popularity.desc&vote_count.gte=500`
  const DISCOVER_TVSERIES = `${API_URL}discover/tv?${API_KEY}&sort_by=popularity.desc&vote_count.gte=500`
  const DISCOVER_ALLTVSERIES = `${API_URL}discover/tv?${API_KEY}&language=en-US&sort_by=${sortBy.value}&page=${seriesPage}&with_genres=${byGenresSeries}&vote_count.gte=500`
  const TRENDING = `${API_URL}trending/all/${trendingPeriod}?${API_KEY}`
  const IMG_URL = 'https://image.tmdb.org/t/p/'

  const auth = getAuth()
  const alertHandler = () => {
    if (isLogIn === false) {
      alert('Deberás registrarte o iniciar sesión para continuar')
    }
  }
  const signUpHandler = () => {
    setSignUpForm(true)
    setSignInForm(false)
  }
  const signInHandler = () => {
    setSignUpForm(false)
    setSignInForm(true)
  }
  const openModal = () => {
    setShowModal(!showModal)
  }
  const closeModal = () => {
    setShowModal(!showModal)
  }
  const validateEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
        return "El correo electrónico no es válido";
    }
    return "";
  }
  const validatePassword = (password) => {
    // Comprobar que la contraseña cumple con ciertas reglas de seguridad
    if (password.length < 8) {
        return "La contraseña debe tener al menos 8 caracteres";
    }
    if (!/\d/.test(password)) {
        return "La contraseña debe tener al menos un número";
    }
    if (!/[a-z]/.test(password)) {
        return "La contraseña debe tener al menos una letra minúscula";
    }
    if (!/[A-Z]/.test(password)) {
        return "La contraseña debe tener al menos una letra mayúscula";
    }
    return "";
  }
  const onChangePassHandler = (ev) => {
    let pass = ev.target.value
    setPassword(pass)
  }
  const onChangeRepeatPassHandler = (ev) => {
    let repPass = ev.target.value
    setRepPassword(repPass)
  }
  const onChangeUserHandler = (ev) => {
    let userName = ev.target.value
    setUser(userName);
  }
  const onSubmitSignUpHandler = (ev) => {
    ev.preventDefault()
    const userError = validateEmail(user)
    const passwordError = validatePassword(password)
    if (userError || passwordError) {
      setError(userError || passwordError)
      return
    }
    setError('')
    createUserWithEmailAndPassword(auth, user, password)
    .then((userCredential) => {
      const userName = userCredential.userName
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(error);
    })  
  }
  const onSubmitSignInHandler = (ev) => {
    ev.preventDefault()
    const userError = validateEmail(user)
    if (userError) {
      setError(userError)
      return
    }
    setError('')
    signInWithEmailAndPassword(auth, user, password)
    .then((userCredential) => {
      const userName = userCredential.userName
      setIsLogIn(true)
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(error);
    })  
  }
  const logOutHandler = () => {
    signOut(auth)
    .then(() => {
      alert('Vuelvas prontos!')
      setIsLogIn(false)
    })
    .catch((error) => {
      alert('Mmm... algo falló!')
    })
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
  const isLogInHandler = () => {
    setIsLogIn(!isLogIn)
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
        API_URL,
        API_KEY,
        IMG_URL,
        buttonShowLess,
        isOpen,
        isLogIn,
        selectedTabFilm,
        selectedTabSeries,
        selectedTabTrending,
        isScrolled,
        error,
        showModal,
        password,
        repPassword,
        signUpForm,
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
        onSubmitSignUpHandler,
        onSubmitSignInHandler,
        onChangeUserHandler,
        onChangePassHandler,
        onChangeRepeatPassHandler,
        openModal,
        closeModal,
        signInHandler,
        signUpHandler,
        logOutHandler,
        alertHandler
      }}>
      {children}
    </ApiContext.Provider>
  )
}