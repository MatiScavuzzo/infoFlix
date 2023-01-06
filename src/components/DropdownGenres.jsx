export const DropdownGenres = ( { children, className, onChange }) => {
  return (
    <ul 
      className={className}>
      {children}
    </ul>
  )
}