import { useContext } from 'react'
import { SignInForm } from '../components/SignInForm'
import { SignUpForm } from '../components/SignUpForm'
import { ApiContext } from '../contexts/ApiContext'

export const Auth = () => {
  const { signUpForm } = useContext(ApiContext)
  return (
    <div>
      {signUpForm === false ? <SignInForm /> : <SignUpForm />}
    </div>
  )
}