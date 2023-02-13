import { Link } from 'react-router-dom'
import { AiOutlineHeart, AiOutlinePlus } from 'react-icons/ai'

export const MediaCard = ({ title, imgSrc, className, linkTo, id, addTo }) => {
  return (
    <div id={id} className={`${className} relative flex flex-col hover:underline w-3/6 sm:w-2/6 md:w-1/4 lg:w-1/6 p-2`}>
          <Link id={id} to={linkTo}>
            <img className='w-11/12 hover:w-full h-auto border border-slate-400 rounded-lg hover:border-red-600' src={imgSrc} alt={title} />
            <div className='absolute gap-4 flex flex-col top-4 right-8 rounded-lg p-2'>
              <span className='bg-white p-2 rounded-lg text-black'><AiOutlineHeart /></span>
              <span className='bg-white p-2 rounded-lg text-black'><AiOutlinePlus /></span>
            </div>
            <div className='w-full text-center font-semibold p-2 h-2/6'>
              {title}
            </div>
          </Link>
        </div>
  )
}