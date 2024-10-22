import FootNote from '../FootNote/FootNote';
import Row from '../Row/Row';
import './Rows.css';
import { useState } from 'react';

export default function Rows(props) {
    const [removingRows, setRemovingRows] = useState([]);

    const handleRemoveRow = (id) => {
        setRemovingRows((prev) => [...prev, id]);

        setTimeout(() => {
            const updatedCategories = props.Categories.filter((category) => category.content.id !== id);
            props.SetCategories(updatedCategories);
        }, 300);
    };

    if (!props.Categories || props.Categories.length === 0) {
        return <p>Carregando...</p>;
    }

    return (
        <div className='Rows'>
            {props.Categories.map((category) => {
                if (category) {
                    const isRemoving = removingRows.includes(category.content.id);
                    return (
                        <Row
                            Category={category}
                            Length={props.Length}
                            Wrap={props.Wrap}
                            isRemoving={isRemoving}
                            onRemove={() => handleRemoveRow(category.content.id)}
                            key={Math.random()}
                        />
                    );
                }
                return null;
            })}
            <FootNote Centralized= {true}/>
        </div>
    );
}
