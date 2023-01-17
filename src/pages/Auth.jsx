import { useContext } from 'react'
import { SignInForm } from '../components/SignInForm'
import { SignUpForm } from '../components/SignUpForm'
import { AuthContext } from '../contexts/AuthContext'

export const Auth = () => {
  const { signUpForm } = useContext(AuthContext)
  return (
    <div>
      {signUpForm === false ? <SignInForm /> : <SignUpForm />}
    </div>
  )
}