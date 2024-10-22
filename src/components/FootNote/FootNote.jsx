import './FootNote.css'
import { FaDeezer } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";

export default function FootNote(props){

    function HandleCleanStorage(){
        localStorage.removeItem('categories');
        localStorage.removeItem('theme');
        window.location.reload()
    }

    return(
        <div className={`FootNote ${props.Centralized ? 'Centralized':''}`}>
            <div className='Clean' onClick={HandleCleanStorage}>Limpar alterações</div>
            <div className='Line'>
                <div className='Row'> <FaGithub className='Icon'/><a href='https://github.com/JoaoVictorFdeBarros/Music_Library'>Repositório</a></div>
                <div className='Row'> <FaDeezer className='Icon'/> <p>Desenvolvido com <a href='https://developers.deezer.com/api'>Deezer Developers</a></p></div>
                <div className='Row'> <CiLinkedin className='Icon'/><a href='https://www.linkedin.com/in/jo%C3%A3o-victor-francisco-de-barros-a602072a8/'>LinkedIn</a></div>
            </div>
            <div className='DisclaimerLine'>O acesso às prévias das músicas e às imagens para fins não comerciais é autorizado pelos <a href='https://developers.deezer.com/termsofuse'>Termos de Uso</a> da Api</div>
        </div>
    )
}