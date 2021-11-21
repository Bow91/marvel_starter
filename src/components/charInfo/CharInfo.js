import { useState, useEffect } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spiner/Spinner';
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss';

const CharInfo = (props) => {

    const {idSelectedChar} = props;

    const [char, setChar] = useState(null),
          [loading, setLoading] = useState(false),
          [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
    }, [idSelectedChar])

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
        if (!idSelectedChar) {
            return;
        }
        onCharLoading();
        marvelService
            .getCharacter(idSelectedChar)
            .then(onCharLoaded)
            .catch(onError)
    }

    const   sceleton = (char || loading || error) ? null : <Skeleton /> ,
            errorMessage = error ? <ErrorMessage /> : null,
            spiner = loading ? <Spinner /> : null,
            content = (loading || error || !char) ? null : <View char={char} />;

    return (
        <div className="char__info">
            {sceleton}
            {errorMessage}
            {spiner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    
    const {name, description, thumbnail, homepage, wiki, comics} = char,
          descriptionChar = (!description) ? 'The description of this character was not found' : description,
          imgStyle = thumbnail.includes('image_not_available') ? "fill" : "cover",
          // eslint-disable-next-line array-callback-return
          elements = comics.map((item, id) => {
                if (id < 10) {
                    return(
                        <li className="char__comics-item" key={id}>
                            {item.name}
                        </li>
                    )
                }
          } );
    
    return (
        <>
            <div className="char__basics">
                        <img src={thumbnail} alt={name} style={{objectFit: imgStyle}} />
                        <div>
                            <div className="char__info-name">{name}</div>
                            <div className="char__btns">
                                <a href={homepage} className="button button__main">
                                    <div className="inner">homepage</div>
                                </a>
                                <a href={wiki} className="button button__secondary">
                                    <div className="inner">Wiki</div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="char__descr">
                        {descriptionChar}
                    </div>
                    <div className="char__comics">Comics:</div>
                    <ul className="char__comics-list">
                        {comics.length > 0 ? elements : 'Comics not found'}
                    </ul>
        </>
    )

}

export default CharInfo;