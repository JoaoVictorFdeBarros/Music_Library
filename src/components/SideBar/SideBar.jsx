import './SideBar.css';
import { IoLibrary } from "react-icons/io5";
import { IoPencil } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { useState } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemType = 'CATEGORY';

function DraggableCategory({ category, isSelected, isEditing, onSetCurrentCategory, onRemoveCategory, index, moveCategory }) {
    const [, ref] = useDrag({
        type: ItemType,
        item: { index },
        canDrag: () => isEditing,
    });

    const [, drop] = useDrop({
        accept: ItemType,
        drop: (item) => {
            if (item.index !== index) {
                moveCategory(item.index, index);
                item.index = index;
            }
        },
    });

    return (
        <div 
            ref={isEditing ? (node) => ref(drop(node)) : null}
            className={`Category ${isSelected ? 'Selected' : ''}`}
            onClick={() => onSetCurrentCategory({ id: category.content.id, type: category.content.type })} 
        >
            <div className={`ArtistCover ${isEditing ? 'Animated' : ''}`}>
                <img className='Cover' src={category.content.picture_medium} alt='cover'/>
                <p className={category.content.type}>{category.content.name}</p>
            </div>
            <FaRegTrashAlt 
                className='Icon' 
                style={isEditing ? { display: '' } : { display: 'none' }} 
                onClick={(e) => {
                    e.stopPropagation();
                    onRemoveCategory(category.content.id);
                }}
            />
        </div>
    );
}

export default function Sidebar(props) {
    const [isEditing, setIsEditing] = useState(false);

    const moveCategory = (fromIndex, toIndex) => {
        props.onMoveCategory(fromIndex, toIndex);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="SideBar">
                <div className='Categories'>
                    <div 
                        className={props.CurrentCategory.id === -1 ? 'Category Selected' : 'Category'} 
                        onClick={() => props.SetCurrentCategory({ id: -1, type: '' })}
                    >
                        <div className='ArtistCover'>
                            <p className='DefaultCategory'>Todos</p>
                        </div>
                    </div>

                    {props.Categories.map((category, index) => (
                        <DraggableCategory
                            key={Math.random()}
                            category={category}
                            index={index}
                            isSelected={(props.CurrentCategory.id === category.content.id) && (props.CurrentCategory.type === category.content.type)}
                            isEditing={isEditing}
                            onSetCurrentCategory={props.SetCurrentCategory}
                            onRemoveCategory={props.onRemoveCategory}
                            moveCategory={moveCategory}
                        />
                    ))}
                </div>
                <div className='EditRow'>
                    <p className='EditMessage'>{isEditing ? 'Arraste para reordenar' : ''}</p>
                    <IoPencil className='Icon' onClick={() => { setIsEditing(!isEditing); }}/>
                </div>
                <div className='Footnote'>
                    <p>Clique para ouvir uma prévia da música</p>
                </div>
            </div>
        </DndProvider>
    );
}
