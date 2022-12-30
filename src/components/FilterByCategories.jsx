import { useContext } from 'react'
import { ApiContext } from '../contexts/ApiContext'
import { Spinner } from './Spinner'


export const FilterByCategories = ({className}) => {
  const {genresList, handlerSelect} = useContext(ApiContext)
  return (
    <div className={className}>
      <div className='pb-2'>
        <h3>Categorías</h3>
      </div>
      <div className='flex flex-wrap items-center justify-center rounded-lg p-1'>
        {!genresList ? <Spinner /> : genresList.map(g => 
        <div className='p-1' key={g.id}>
          <input 
          type='checkbox'
          name='categories'
          value={g.id}
          onChange={handlerSelect}
          />
          <label>{g.name}</label>
        </div>)}
      </div>
    </div>
  )
}