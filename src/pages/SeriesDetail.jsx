import { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ApiContext } from '../contexts/ApiContext'

export const SeriesDetail = () => {
  const { API_URL, API_KEY, seriesData, setSeriesData, IMG_URL, seriesProviders, setSeriesProviders } = useContext(ApiContext)
  const { serieId } = useParams()
  useEffect(() => {
    fetch(`${API_URL}tv/${serieId}?${API_KEY}&language=es-AR`)
    .then(res => res.json())
    .then(resSeriesData => setSeriesData(resSeriesData))
  }, [serieId])
  useEffect(() => {
    fetch(`${API_URL}tv/${serieId}/watch/providers?${API_KEY}`)
      .then(res => res.json())
      .then(resWatchProviders => setSeriesProviders(resWatchProviders.results.AR))
  }, [serieId])
  return (
    <>
      {seriesData.length === 0 ? (
        <h1>Cargando...</h1>
      ) : (
        <div>
          <div className='flex items-start px-1 pt-2'>
            <span><Link className='px-1 hover:underline' to='/'>Home </Link></span><span>/</span><span><Link className='px-1 hover:underline' to='/series'>Series </Link></span><span>/</span><span className='underline'>{seriesData.original_name}</span>
          </div>
          <div className='w-full flex flex-col items-center justify-center md:flex-row p-2'>
            <div className='w-full flex items-center justify-center md:w-4/6 lg:w-3/6'>
              <img
                className='rounded-lg border border-slate-500 shadow-md shadow-red-600'
                src={`${IMG_URL}w500${seriesData.poster_path}`}
                alt={`Poster ${seriesData.name}`}
              />
            </div>
            <div className='p-2 md:py-0 px-2 md:w-3/6 lg:w-4/6'>
              <div>
                <h1>{seriesData.name}</h1>
                <h1>({seriesData.original_name})</h1>
              </div>
              <div className='p-2'>
                <h2>Sinopsis</h2>
                <p className='p-1'>{seriesData.overview}</p>
                {seriesData.tagline != '' && <p className='p-1'>Tagline: "{seriesData.tagline}"</p>}
                <p className='p-1'>Episodios totales: {seriesData.number_of_episodes}</p>
                <div className='p-1 flex flex-col'>
                  <p className='p-1'>Temporadas:</p>
                  <ul>
                    {seriesData.seasons.map(temp => 
                    <li key={temp.id}>
                      <p>{temp.name} - {temp.episode_count} episodios - Fecha de lanzamiento: {temp.air_date}</p>
                    </li>)}
                  </ul>
                </div>
                <p className='p-1'>Géneros: {!seriesData ? <span>Cargando...</span> : seriesData.genres.map(g => <span key={g.id}> | {g.name} | </span>)} </p>
                <p className='p-1'>Fecha de lanzamiento: {seriesData.first_air_date}</p>
              </div>
              <div className='flex flex-wrap items-center justify-center gap-2'>
                {seriesData.created_by.map(by => 
                <div key={by.id} className='flex flex-col items-center justify-center'>
                  <img className='rounded-full w-20 h-20 object-cover border border-slate-400' src={`${IMG_URL}w185${by.profile_path}`} alt={by.name} />
                  <p className='p-2'>{by.name}</p>
                </div>)}
              </div>
              <div className='flex flex-col'>
                <h3>Producción</h3>
                <div className='flex p-2 gap-2 items-center justify-center flex-wrap'>
                  {!seriesData ? <span>Cargando...</span> : seriesData.production_companies.map(pc => 
                    <div key={pc.id} className='flex bg-slate-400 p-1 rounded-md flex-wrap h-20 text-black flex-col gap-2 items-center justify-center'>
                      <img 
                        className='w-4/5'
                        src={`${IMG_URL}w92${pc.logo_path}`}
                        alt={pc.name}/>
                    </div>)}
                </div>
              </div>
              <div className='flex items-center justify-center'>
                {!seriesProviders ? (
                  <div className='flex flex-col'>
                    <h3>Proveedores disponibles:</h3>
                    <p>No tenemos información de proveedores para mostrar</p>
                  </div>
                ) : (
                  <div className='flex flex-col items-center p-2'>
                    <h3>Proveedores disponibles:</h3>
                    <div className='flex items-center justify-center p-2 gap-2'>
                      {!seriesProviders.flatrate
                        ? !seriesProviders.rent
                          ? seriesProviders.buy.map((mp) => (
                              <a key={mp.id} href={seriesProviders.link} target='_blank'>
                                <img
                                  className='rounded-xl shadow-lg shadow-red-600'
                                  src={`${IMG_URL}w45${mp.logo_path}`}
                                  alt={mp.provider_name}
                                />
                              </a>
                            ))
                          : seriesProviders.rent.map((mp) => (
                              <a key={mp.id} href={seriesProviders.link} target='_blank'>
                                <img
                                  className='rounded-xl shadow-lg shadow-red-600'
                                  src={`${IMG_URL}w45${mp.logo_path}`}
                                  alt={mp.provider_name}
                                />
                              </a>
                            ))
                        : seriesProviders.flatrate.map((mp) => (
                            <a key={mp.id} href={seriesProviders.link} target='_blank'>
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

