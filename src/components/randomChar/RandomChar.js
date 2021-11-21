import { useState, useEffect } from 'react';
import Spinner from '../spiner/Spinner';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';


const RandomChar = () => {

    const [char, setChar] = useState({}),
          [loading, setLoading] = useState(true),
          [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
         const timerUpdateChar = setInterval(updateChar, 25000);
        
         return () => {
             clearInterval(timerUpdateChar);
         }
    }, [])
    
    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
        setError(false);
    }

    const onCharLoading = () => {
        setLoading(true);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011440 - 1011000) + 1011000);
        onCharLoading();
        marvelService
            .getCharacter(id)
            .then(onCharLoaded)
            .catch(onError)
    }

    const   errorMessage = error ? <ErrorMessage /> : null,
            spiner = loading ? <Spinner /> : null,
            content = (loading || error) ? null : <View char={char} />;


    return (
        <div className="randomchar">
            {errorMessage} 
            {spiner} 
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({char}) => {

    const {name, description, thumbnail, homepage, wiki} = char,
          descriptionChar = (!description) ? 'The description of this character was not found' : description,
          imgStyle = thumbnail.includes('image_not_available') ? "fill" : "cover";
          

    return (
        <div className="randomchar__block">
                    <img src={thumbnail} alt="Random character" className="randomchar__img" style={{objectFit: imgStyle}} />
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                            {descriptionChar}
                        </p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
    )
}

export default RandomChar;