import { Spinner } from './Spinner'
import { DropdownGenres } from './DropdownGenres'
import { useState } from 'react'
import { HiOutlineChevronDown } from 'react-icons/hi'
import { HiOutlineX } from 'react-icons/hi'


export const FilterByCategories = ({className, genresList, onChange}) => {
  const [showGenres, setShowGenres] = useState(false)
  const showGenresHandler = () => {
    setShowGenres(!showGenres)
  }
  return (
    <div className={className}>
      <div className='pb-2 flex items-center justify-center'>
        <button className='p-2 flex items-center justify-center' onClick={showGenresHandler}>
        <h3 className='p-1'>Categorías</h3>
        {showGenres === false ? <HiOutlineChevronDown /> : <HiOutlineX/>}</button>
      </div>
      <div className={`${showGenres === false ? 'hidden' : ''} w-full bg-black rounded-md scroll-m-1 top-14 p-1 border border-slate-300 left-0 h-40 overflow-auto absolute`}>
        <DropdownGenres className='flex flex-col w-full items-start justify-start rounded-lg p-1'>
          {!genresList ? (
            <Spinner />
          ) : (
            genresList.map((g) => (
              <li onChange={onChange} key={g.id}>
                <label className='flex gap-2'>
                  <input
                    type='checkbox'
                    name='categories'
                    value={g.id}
                    onChange={onChange}
                  />
                  {g.name}
                </label>
              </li>
            ))
          )}
        </DropdownGenres>
      </div>
    </div>
  );
}