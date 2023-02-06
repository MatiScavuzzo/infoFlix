export const SignInForm = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className='flex flex-col' method='post'>
      <label htmlFor='userName'>Usuario</label>
      <input type='text' name='userName' id='userName' />
      <label htmlFor='password'>Contraseña</label>
      <button type='submit'>Enviar</button>
    </form>
  )
}