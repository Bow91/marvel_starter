import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spiner/Spinner';

import './comicsList.scss';

const ComicsList = () => {

    const [comics, setComics] = useState([]),
          [loadingNewItem, setLoadingNewItem] = useState(false),
          [offset, setOffset] = useState(0),
          [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        // initial ? setLoadingNewItem(false) : loadingNewItem(true);
        getAllComics(offset).then(onLoadComics);
    }

    const onLoadComics = (newComics) => {
        setComics(newComics);
    }

    const onPrevComics = () => {
        offset > 8 ? setOffset(offset => offset - 8) : setOffset(offset => offset)
        
        onRequest(offset);
    }

    const onNextComics = () => {
        setOffset(offset => offset + 8)
        onRequest(offset);
    }

    function ItemComics(comics) {
        const elements = comics.map(item => {
            const {id, thumbnail, price, title} = item;
            return (
            <li className="comics__item">
                <a href="#">
                    <img src={thumbnail} alt={title} className="comics__item-img" key={id} />
                    <div className="comics__item-name">{title}</div>
                    <div className="comics__item-price">{price}</div>
                </a>
            </li>
            )
        })
        return (
            <ul className="comics__grid">
                {elements}
            </ul>
        )
    }

    const loaded = loading ? <Spinner /> : null,
          errorMessage = error ? <ErrorMessage /> : null;
        //   charEndedStyle = charEnded ? 'none' : 'block';

    return (
        <div className="comics__list">
            {loaded}
            {errorMessage}
            {ItemComics(comics)}
            <div className="button__center">
                <button className="button button__main button__prev"
                        // style={{'display' : charEndedStyle}}
                        onClick={onPrevComics}>
                    <div className="inner">Prev</div>
                </button>
                <button className="button button__main button__next"
                        // style={{'display' : charEndedStyle}}
                        onClick={onNextComics}>
                    <div className="inner">Next</div>
                </button>
            </div>

        </div>
    )
}

export default ComicsList;