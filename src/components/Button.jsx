const Button = ({children, className, onClick, value}) => {
  return (
    <button onClick={onClick} value={value} className={`${className} flex items-center text-lg justify-center p-2 w-32 rounded-lg font-extrabold text-red-600 bg-black border border-slate-500`}>{children}</button>
  )
}

export default Button