import { useContext } from 'react'
import Button from '../components/Button'
import { ApiContext } from '../contexts/ApiContext'

export const PaginationContainer = ({onClickMore, onClickLess}) => {
  const { buttonShowLess } = useContext(ApiContext)
  return (
    <>
      <div className='flex flex-col w-full gap-3 items-center justify-around p-4'>
        <Button onClick={onClickMore}>Ver más</Button>
        <Button className={`${buttonShowLess===false ? 'hidden' : 'flex'}`} onClick={onClickLess}>Ver menos</Button>
      </div>
      <div className='w-full hidden sm:flex'>

      </div>
    </>
  )
}