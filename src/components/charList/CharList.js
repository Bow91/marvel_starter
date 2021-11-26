import { useState, useEffect, useRef } from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spiner/Spinner';

import './charList.scss';

const CharList = (props) => {

    const [chars, setChars] = useState([]),
          [loadingNewItem, setLoadingNewItem] = useState(false),
          [offset, setOffset] = useState(210),
          [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setLoadingNewItem(false) : setLoadingNewItem(true);
        getAllCharacters(offset)
            .then(onLoadChars)
    }

    const onLoadChars = (newChars) => {
        let ended = false;
        if (newChars.length < 0) {
            ended = true;
        }

        setChars(chars => [...chars, ...newChars]);
        setLoadingNewItem(false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended)


    }

    const ref = useRef([]);

    const onCharSelect = (index) => {
        // console.log(this.ref[id].current);
        ref.current.forEach(item => item.classList.remove('char__item_selected'));
        ref.current[index].classList.add('char__item_selected');
        ref.current[index].focus();
    }

    function ItemChar(chars) {
        const elements = chars.map((item, index) => {
            const {name, thumbnail, id} = item,
                  imgStyle = thumbnail.includes('image_not_available') ? "fill" : "cover";
            return (
                <li className="char__item"
                    ref={elem => ref.current[index] = elem}
                    key = {id} 
                    tabIndex = {index + 10}
                    onClick={() => {props.onSelectChar(id);
                                    onCharSelect(index)}}
                    onKeyDown={(e) => {
                        if(e.key === ' ' || e.key === 'Enter') {
                            props.onSelectChar(id);
                            onCharSelect(index)
                        }
                    }}>
                    <img src={thumbnail} 
                         alt={name} 
                         style={{'objectFit': imgStyle}}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        })
    
        return (
            <ul className="char__grid">
                {elements}
            </ul>
        )
    }

    const   loaded = loading && !loadingNewItem? <Spinner /> : null,
            errorMessage = error ? <ErrorMessage /> : null,
            charEndedStyle = charEnded ? 'none' : 'block';
    return (
        <div className="char__list">
            {loaded}
            {errorMessage}
            {ItemChar(chars)}
            <button className="button button__main button__long"
                    disabled={loadingNewItem}
                    style={{'display': charEndedStyle}}
                    onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;