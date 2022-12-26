import LogoSVG from '../assets/Logo.svg'

export const Logo = ({ className }) => {
  return <img src={LogoSVG} alt='Logo InfoFlix' className={className} />
}