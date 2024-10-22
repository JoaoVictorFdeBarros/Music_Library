import { useEffect, useRef, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Sidebar from '../SideBar/SideBar';
import Rows from '../Rows/Rows';
import SearchResult from '../SearchResult/SearchResult';
import './Homepage.css';
import getGenre from '../../services/GenreService';
import getArtist from '../../services/ArtistService';
import preset from '../../assets/preset.json';
import { AiOutlineLoading } from 'react-icons/ai';
import FootNote from '../FootNote/FootNote';
import { useParams } from 'react-router-dom';

export default function HomePage(props) {
    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState({ id: -1, type: '' });
    const [currentPreset, setCurrentPreset] = useState(preset);
    const [loading, setLoading] = useState(false);
    const isLoaded = useRef(false);
    const { query: urlQuery } = useParams();
    const [query, setQuery] = useState(urlQuery || '');
    const [queryResponse, setQueryResponse] = useState('')

    const saveCategoriesToLocalStorage = (categories) => {
        localStorage.setItem('categories', JSON.stringify(categories));
    };
    const loadCategoriesFromLocalStorage = () => {
        const savedCategories = localStorage.getItem('categories');
        if (savedCategories) {
            return JSON.parse(savedCategories);
        }
        return [];
    };
    useEffect(() => {
        const savedCategories = loadCategoriesFromLocalStorage();
        if (savedCategories.length > 0) {
            setCategories(savedCategories);
        } else {
            fetchCategories(currentPreset, new AbortController().signal);
        }
    }, [currentPreset]);
    
    useEffect(() => {
        if (categories.length > 0) {
            saveCategoriesToLocalStorage(categories);
        }
    }, [categories]);

    const addCategoryByGenre = async (code, position, signal) => {
        return {
            content: await getGenre(code, signal),
            type: 'Genre',
            position: position
        };
    };

    const addCategoryByArtist = async (code, position, signal) => {
        return {
            content: await getArtist(code, signal),
            type: 'Artist',
            position: position
        };
    };

    const fetchCategories = async (preset, signal) => {
        isLoaded.current = true; 
        setLoading(true);
        try {
            const genrePromises = preset.initialGenres.map((genre) => 
                addCategoryByGenre(genre.value, genre.position, signal)
            );
            const genres = await Promise.all(genrePromises);

            const artistPromises = preset.initialArtists.map((artist) => 
                addCategoryByArtist(artist.value, artist.position, signal)
            );
            const artists = await Promise.all(artistPromises);

            const combinedCategories = [...genres, ...artists].sort((a, b) => a.position - b.position);
            setCategories(combinedCategories);
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Request was cancelled');
            } else {
                console.error('Error fetching categories:', error);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveCategory = (id) => {
        setCategories((prev) => prev.filter((category) => category.content.id !== id));
    };

    const handleMoveCategory = (fromIndex, toIndex) => {
        setCategories((prevCategories) => {
            const updatedCategories = [...prevCategories];
            const [movedCategory] = updatedCategories.splice(fromIndex, 1);
            updatedCategories.splice(toIndex, 0, movedCategory);
            return updatedCategories;
        });
    };
    
    return (
        <div className='Homepage'>

            <SearchBar Query={query} SetQuery = {setQuery} SetQueryResponse = {setQueryResponse}/>
            { query.length ? 
            <div className='QueryBody'>
            <SearchResult QueryResponse = {queryResponse} SetQuery = {setQuery} Categories = {categories} SetCategories = {setCategories} key={Math.random()}/>
            <FootNote/>
            </div>
            :
            loading ? 
                <div className='LoadingContainer'>
                    <AiOutlineLoading className='LoadingIcon' />
                </div>
            :
                <div className='Body'>
                    <Sidebar 
                        Categories={categories} 
                        SetCategories={setCategories} 
                        CurrentCategory={currentCategory} 
                        SetCurrentCategory={setCurrentCategory}
                        onRemoveCategory={handleRemoveCategory}
                        onMoveCategory={handleMoveCategory}
                    />
                    {currentCategory.id === -1 
                        ? <Rows Categories={categories} Length={15} Wrap={false}/> 
                        : <Rows Categories={[categories.find((category) => (category.content.id === currentCategory.id))]} Length={75} Wrap={true}/> 
                    }
                </div>
        }
        </div>
    );
}
