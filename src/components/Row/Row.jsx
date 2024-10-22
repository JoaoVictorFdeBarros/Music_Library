import { useEffect, useState, useRef } from 'react';
import getTracks from '../../services/TracksService';
import Track from '../Track/Track';
import './Row.css';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { AiOutlineLoading } from 'react-icons/ai';

export default function Row(props) {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const tracksContainerRef = useRef(null);

    useEffect(() => {
        const fetchTracks = async () => {
            setLoading(true);
            try {
                const response = await getTracks(
                    
                    props.Category.type === 'Genre' ? 'chart' : 'artist',
                    props.Category.content.id,
                    props.Length
                );
                
                if (response && response.data) {
                    setTracks(response.data);
                } else {
                    await new Promise(r => setTimeout(r, 500)).then(fetchTracks());
                    setTracks([]);
                }
            } catch (err) {
                console.error(`Error fetching track data: ${err}`);
                setTracks([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTracks();
    }, [props]);

    const scrollLeft = () => {
        if (tracksContainerRef.current) {
            tracksContainerRef.current.scrollBy({
                left: -300,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (tracksContainerRef.current) {
            tracksContainerRef.current.scrollBy({
                left: 300,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className='Row'>
            <p className='RowTitle'>{props.Category.content.name}</p>
            <div className='TrackButtons'>
                {props.Wrap ? null : <button onClick={scrollLeft} className='ScrollButton ScrollButtonLeft'><MdKeyboardArrowLeft className='Arrow' /></button>}
                <div className={props.Wrap ? 'Tracks WrapRow' : 'Tracks NoWrapRow'} ref={tracksContainerRef}>
                    {loading ? (
                    <AiOutlineLoading className='LoadingIcon' />
                    ) : (
                        Array.isArray(tracks) && tracks.length > 0 ? (
                            tracks.map((track) => (
                                <Track Track={track} type={props.Category.type} key={track.id} Resolution='medium'/>
                            ))
                        ) : (
                           <></>
                        )
                    )}
                </div>
                {props.Wrap ? null : <button onClick={scrollRight} className='ScrollButton ScrollButtonRight'><MdKeyboardArrowRight className='Arrow' /></button>}
            </div>
        </div>
    );
}
