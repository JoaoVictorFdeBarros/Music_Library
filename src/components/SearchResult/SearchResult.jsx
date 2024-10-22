import { useEffect, useState } from 'react';
import getAlbum from '../../services/AlbumService';
import Track from '../Track/Track';
import './SearchResult.css';
import { IoAddOutline } from "react-icons/io5";

export default function SearchResult(props) {
    const [album, setAlbum] = useState([])

    useEffect(() => {
        const fetchAlbum = async () => {

            
            if (props.QueryResponse) {
                try {
                    const response = await getAlbum(props.QueryResponse.album.id);
                    setAlbum(response.data)
                } catch (error) {
                    console.error('Error fetching album:', error);
                    await new Promise(r => setTimeout(r, 500)).then(fetchAlbum());
                }
            }
        };
        fetchAlbum();
    }, [props.QueryResponse]);

    function HandleAddCategory() {
        const minPosition = props.Categories.length > 0 
            ? Math.min(...props.Categories.map(cat => cat.position)) 
            : 1;
    
        const newCategory = {
            'content': props.QueryResponse.artist,
            'type': 'Artist',
            'position': minPosition - 1
        };
    
        props.SetCategories([newCategory, ...props.Categories]);
        props.SetQuery('');
    }
    

    return (
        <div className='SearchResult'>
            {props.QueryResponse ? 
                <Track Track={props.QueryResponse} Type='query' Resolution='high' />
             : 
                <>Nenhum resultado encontrado</>
            }
            {
                props.QueryResponse ?
                <div className='Album'>
                    <div className='AddArtist' onClick={HandleAddCategory}><IoAddOutline className='Icon'/>Adicionar {props.QueryResponse.artist.name} à playlist</div>
                    <div className='AlbumList'>
                        <h2>{props.QueryResponse.album.title}</h2>
                    {album.map((Track)=>{
                        
                        return(
                            <div className='AlbumFile' key={Math.random()} onClick={()=>{props.SetQuery(`${Track.title} - ${Track.artist.name}`)}}>{Track.title}</div>
                        )
                    })}
                    </div>
                </div>
                
                :
                <div>Álbum não encontrado</div>
            }

        </div>
    );
}
