import { Link } from 'react-router-dom'

export const MediaCard = ({ onClick, title, imgSrc, className, linkTo, id }) => {
  return (
    <div id={id} className={`${className} flex flex-col hover:underline w-3/6 sm:w-2/6 md:w-1/4 lg:w-1/6 p-2`}>
          <Link id={id} onClick={onClick} to={linkTo}>
            <img className='w-11/12 hover:w-full h-auto border border-slate-400 rounded-lg hover:border-red-600' src={imgSrc} alt={title} />
            <div className='w-full text-center font-semibold p-2 h-2/6'>
              {title}
            </div>
          </Link>
        </div>
  )
}