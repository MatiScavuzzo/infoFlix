export const InfoPass = ( { onClose, className } ) => {
  return (
    <div className={className}>
      <ul>Condiciones de la contraseña:
        <li>La contraseña debe tener al menos 8 caracteres</li>
        <li>La contraseña debe tener al menos un número</li>
        <li>La contraseña debe tener al menos una letra minúscula</li>
        <li>La contraseña debe tener al menos una letra mayúscula</li>
        <div role='button' className=' pointer-events-none' onClose={onClose}>Cerrar</div>
      </ul>
    </div>
  )
}