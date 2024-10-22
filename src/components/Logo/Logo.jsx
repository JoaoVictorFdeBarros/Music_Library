import './Logo.css'
import logo from '../../assets/Images/logo.png'
import LightLogo from '../../assets/Images/logoLight.png'

export default function Logo(){
    return(
        <div className='Logo'>
        {localStorage.getItem('theme') === 'light' ? <img src={LightLogo} alt='logo'/> : <img src={logo} alt='logo'/>}    
        </div>
    )
}
