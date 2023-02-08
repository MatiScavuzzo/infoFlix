import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { ApiContext } from '../contexts/ApiContext'
import { AuthContext } from '../contexts/AuthContext'
import { ThemeContext } from '../contexts/ThemeContext'

export const FirstView = () => {
  const { APPROVE_TOKEN } = useContext(ApiContext)
  const { onLogInHandler, onSignInHandler } = useContext(AuthContext)
  const { darkMode } = useContext(ThemeContext)
  return (
    <div
      className={`${
        darkMode ? 'dark' : 'light'
      } h-screen flex flex-col items-center justify-start p-2`}
    >
      <main className='flex flex-col items-center justify-center gap-4'>
        <h1 className='text-red-600 font-extrabold'>Gracias por estar acá</h1>
        <h2>
          InfoFlix es una app que te da info de pelis y series que ya viste o
          querés ver
        </h2>
        <div className='flex items-center justify-center'>
          <div className='flex flex-col gap-4 w-2/3 p-4 items-start border-4 rounded-lg border-slate-400'>
            <h3>Antes de empezar, hay dos cosas muy importantes:</h3>
            <ul className='flex flex-col gap-4 list-[square] p-4 marker:text-red-600 marker:font-extrabold'>
              <li>
                <article className='text-left'>
                  Para tener una experiencia increible con InfoFlix y, poder
                  crear listas de lo que ya has visto o quisieras ver, puntuar
                  pelis o series, o bien encontrar qué ver en tus servicios de
                  streaming preferidos, hacé click{' '}
                  <button onClick={onSignInHandler}>
                  <a
                    className='border border-red-600 font-semibold p-1 rounded-lg'
                    href={APPROVE_TOKEN}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    acá
                  </a>
                  </button>{' '}
                  para registrarte o acceder en TMDb (The Movie Database). Una
                  vez logueado autorizás a InfoFlix y automáticamente volvés a
                  la app, donde te vamos a pedir crear un nombre de usuario para que puedas acceder
                  a InfoFlix cuando quieras, desde donde quieras.
                  <span className='font-semibold underline underline-offset-4'>
                    Tené en cuenta que InfoFlix no va a solicitarte en ningún
                    momento los datos de registro en TMDb.
                  </span>
                </article>
              </li>
              <li className='text-left'>
                Si ya tienes cuenta, haz click <button onClick={onLogInHandler}><Link className='border border-red-600 font-semibold p-1 rounded-lg' to={'/auth'}>aquí</Link></button> para iniciar sesión
              </li>
              <li>
                <article className='text-left'>
                  Si sólo querés ver qué hay de nuevo, hacé click en continuar
                </article>
              </li>
            </ul>
          </div>
        </div>
        <Button>
          <Link to={`/home`}>Continuar</Link>
        </Button>
      </main>
    </div>
  );
}