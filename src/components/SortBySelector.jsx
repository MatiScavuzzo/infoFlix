export const SortBySelector = ({className, onChange}) => {
  return ( 
  <select defaultValue='popularity.desc' onChange={onChange} className={className} name='sortBy' id='sortBy'>
    <option value='popularity.asc'>Popularidad ascendente</option>
    <option value='popularity.desc'>Popularidad descendente</option>
    <option value='release_date.asc'>Fecha de lanzamiento ascendente</option>
    <option value='release_date.desc'>Fecha de lanzamiento descendente</option>
    <option value='original_title.asc'>Título original ascendente</option>
    <option value='original_title.desc'>Título original descendente</option>
  </select>
  )
}