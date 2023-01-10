import { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Spinner } from '../components/Spinner'
import { ApiContext } from '../contexts/ApiContext'
import { ThemeContext } from '../contexts/ThemeContext'

export const MovieDetail = () => {
  const { API_URL, API_KEY, movieData, setMovieData, IMG_URL, moviesProviders, setMoviesProviders } = useContext(ApiContext)
  const { darkMode } = useContext(ThemeContext)
  const { movieId } = useParams()
  useEffect(() => {
    fetch(`${API_URL}movie/${movieId}?${API_KEY}&language=es-AR`)
    .then(res => res.json())
    .then(resMovieData => setMovieData(resMovieData))
  }, [movieId])
  useEffect(() => {
    fetch(`${API_URL}movie/${movieId}/watch/providers?${API_KEY}`)
      .then(res => res.json())
      .then(resWatchProviders => setMoviesProviders(resWatchProviders.results.AR))
  }, [movieId])
  return (
    <>
      {movieData.length === 0 ? (
        <Spinner />
      ) : (
        <div className={`${darkMode ? 'dark' : 'light'}`}>
          <div className='flex items-start px-1 pt-2'>
            <span><Link className='px-1 hover:underline' to='/'>Home </Link></span><span>/</span><span><Link className='px-1 hover:underline' to='/movies'>Peliculas </Link></span><span>/</span><span className='underline'>{movieData.original_title}</span>
          </div>
          <div className='w-full flex flex-col items-center justify-center md:flex-row p-2'>
            <div className='w-full flex items-center justify-center md:w-4/6 lg:w-3/6'>
              <img
                className='rounded-lg border border-slate-500 shadow-md shadow-red-600'
                src={`${IMG_URL}w500${movieData.poster_path}`}
                alt={`Poster ${movieData.title}`}
              />
            </div>
            <div className='p-2 md:py-0 px-2 md:w-3/6 lg:w-4/6'>
              <div>
                <h1>{movieData.title}</h1>
                <h1>({movieData.original_title})</h1>
              </div>
              <div className='p-2'>
                <h2>Sinopsis</h2>
                <p className='p-1'>{movieData.overview}</p>
                <p className='p-1'>Tagline: "{movieData.tagline}"</p>
                <p className='p-1'>Duración: {movieData.runtime} minutos.</p>
                <p className='p-1'>Géneros: {!movieData ? <Spinner /> : movieData.genres.map(g => <span key={g.id}> | {g.name} | </span>)} </p>
                <p className='p-1'>Fecha de lanzamiento: {movieData.release_date}</p>
              </div>
              <div className='flex flex-col'>
                <h3>Producción</h3>
                <div className='flex p-2 gap-2 items-center justify-center'>
                  {!movieData ? <Spinner /> : movieData.production_companies.map(pc => 
                    <div key={pc.id} className='flex bg-slate-400 p-1 rounded-md flex-wrap h-20 text-black flex-col gap-2 items-center justify-center'>
                      <img 
                        className='w-4/5'
                        src={`${IMG_URL}w92${pc.logo_path}`}
                        alt={pc.name}/>
                    </div>)}
                </div>
              </div>
              <div className='flex items-center justify-center'>
                {!moviesProviders ? (
                  <div className='flex flex-col'>
                    <h3>Proveedores disponibles:</h3>
                    <p>No tenemos información de proveedores para mostrar</p>
                    <p>Sólo en cines</p>
                  </div>
                ) : (
                  <div className='flex flex-col items-center p-2'>
                    <h3>Proveedores disponibles:</h3>
                    <div className='flex items-center justify-center p-2 gap-2'>
                      {!moviesProviders.flatrate
                        ? !moviesProviders.rent
                          ? moviesProviders.buy.map((mp) => (
                              <a key={mp.id} href={moviesProviders.link} target='_blank'>
                                <img
                                  className='rounded-xl shadow-lg shadow-red-600'
                                  src={`${IMG_URL}w45${mp.logo_path}`}
                                  alt={mp.provider_name}
                                />
                              </a>
                            ))
                          : moviesProviders.rent.map((mp) => (
                              <a key={mp.id} href={moviesProviders.link} target='_blank'>
                                <img
                                  className='rounded-xl shadow-lg shadow-red-600'
                                  src={`${IMG_URL}w45${mp.logo_path}`}
                                  alt={mp.provider_name}
                                />
                              </a>
                            ))
                        : moviesProviders.flatrate.map((mp) => (
                            <a key={mp.id} href={moviesProviders.link} target='_blank'>
                              <img
                                className='rounded-xl shadow-lg shadow-red-600'
                                src={`${IMG_URL}w45${mp.logo_path}`}
                                alt={mp.provider_name}
                              />
                            </a>
                          ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

