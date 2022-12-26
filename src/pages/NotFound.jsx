import { useNavigate, useRouteError } from 'react-router-dom'
import Button from '../components/Button'

export const NotFound = () => {
  const error = useRouteError()
  const navigate = useNavigate()
  return (
    <div className='bg-white text-black font-extrabold w-full h-screen flex flex-col items-center justify-center'>
      <h1>404 Not Found (en criollo, no se encontró nada)</h1>
      <h2>Aqui debería de haber algo, pero no hay nada</h2>
      <p>{error.statusText || error.message}</p>
      <Button onClick={() => navigate(-1)}>Volvamos</Button>
    </div>
  )
}