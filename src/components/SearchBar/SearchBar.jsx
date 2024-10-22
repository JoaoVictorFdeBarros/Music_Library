import { useNavigate } from 'react-router-dom';
import './SearchBar.css';
import { FaRegMoon, FaSun } from "react-icons/fa";
import getQuery from '../../services/QueryService';
import Logo from '../Logo/Logo';
import { useEffect, useState } from 'react';

export default function SearchBar(props) {
    const navigate = useNavigate();
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        document.documentElement.className = savedTheme;
    }, []);

    useEffect(()=>{
        const handleQuery = async () => {
            try {
                const response = await getQuery(props.Query, 1);
                
                if (response && response.data) {
                    navigate(`/${props.Query}`);
                    props.SetQueryResponse(response.data[0])
                }
                else{
                    navigate('/')
                }
            } catch (err) {
                console.error(`Error fetching query data: ${err}`);
            }
        };

        handleQuery()
    },[props.Query])


    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.className = newTheme;
        localStorage.setItem('theme', newTheme);
    };

    return (
        <div className='SearchBar'>
            <Logo className='Logo'/>
            <input 
                type='text' 
                className='Input' 
                placeholder='Pesquise uma música' 
                value={props.Query}
                onChange={(event) =>{props.SetQuery(event.target.value)}} 
            />
            {theme === 'light' ? <FaSun className='Icon' onClick={toggleTheme}/> : <FaRegMoon className='Icon' onClick={toggleTheme}/>}
        </div>
    );
}
