import { Link } from 'react-router-dom'
import { AiFillHeart, AiOutlineHeart, AiOutlinePlus } from 'react-icons/ai'
import { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export const MediaCard = ({ title, imgSrc, className, linkTo, id, addTo }) => {
  const { isLoggedIn } = useContext(AuthContext)
  const [isLiked, setIsLiked] = useState(false)

  const addToFavoriteList = () => {
    setIsLiked(!isLiked)
  }
  return (
    <div
      id={id}
      className={`${className} relative flex flex-col hover:underline w-3/6 sm:w-2/6 md:w-1/4 lg:w-1/6 p-2`}
    >
      {isLoggedIn && (
        <div className='absolute gap-2 flex flex-col top-2 right-5 rounded-lg p-2 z-10'>
          <button
            onClick={addToFavoriteList}
            className='bg-white p-2 rounded-lg text-black'
          >
            {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
          </button>
          <button
            onClick={addTo}
            className='bg-white p-2 rounded-lg text-black'
          >
            <AiOutlinePlus />
          </button>
        </div>
      )}
      <Link id={id} to={linkTo}>
        <img
          className='w-11/12 hover:w-full h-auto border border-slate-400 rounded-lg hover:border-red-600'
          src={imgSrc}
          alt={title}
        />
        <div className='w-full text-center font-semibold p-2 h-2/6'>
          {title}
        </div>
      </Link>
    </div>
  );
}