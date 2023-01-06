import { Spinner } from './Spinner'
import { DropdownGenres } from './DropdownGenres'
import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { MdOutlineClose } from 'react-icons/md'


export const FilterByCategories = ({className, genresList, onChange}) => {
  const [showGenres, setShowGenres] = useState(false)
  const showGenresHandler = () => {
    setShowGenres(!showGenres)
  }
  return (
    <div className={className}>
      <div className='pb-2 flex'>
        <h3 className='p-1'>Categorías</h3>
        <button className='p-1' onClick={showGenresHandler}>{showGenres === false ? <FaChevronDown /> : <MdOutlineClose/>}</button>
      </div>
      <div className={`${showGenres === false ? 'hidden' : ''} w-full bg-black top-10 p-2 border border-slate-300 left-0 h-40 overflow-auto absolute`}>
        <DropdownGenres className='flex flex-col w-full items-start justify-start rounded-lg p-1'>
          {!genresList ? (
            <Spinner />
          ) : (
            genresList.map((g) => (
              <li onChange={onChange} className='p-1' key={g.id}>
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