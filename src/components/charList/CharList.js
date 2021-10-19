import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spiner/Spinner';

import './charList.scss';

class CharList extends Component {
    state = {
        chars: [],
        loading: true,
        error: false,
        loadingNewItem: false,
        offset: 210,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onListCharsLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onLoadChars)
            .catch(this.onError)
    }

    onListCharsLoading = () => {
        this.setState({
            loadingNewItem: true
        })
    }

    onLoadChars = (newChars) => {
        let ended = false;
        if (newChars.length < 0) {
            ended = true;
        }

        this.setState(({offset, chars}) => ({
            chars: [...chars, ...newChars],
            loading: false,
            loadingNewItem: false,
            offset: offset + 9,
            charEnded: ended
        }));
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    ItemChar = (chars) => {
        const elements = chars.map(item => {
            const {name, thumbnail, id} = item,
                  imgStyle = thumbnail.includes('image_not_available') ? "fill" : "cover";
            return (
                <li className="char__item" 
                    key = {id} 
                    onClick={() => this.props.onSelectChar(id)}>
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

    render() {
        const {chars, loading, error, loadingNewItem, offset, charEnded} = this.state,
              loaded = loading ? <Spinner /> : null,
              errorMessage = error ? <ErrorMessage /> : null,
              charsLoad = !(loading || error) ? this.ItemChar(chars) : null,
              charEndedStyle = charEnded ? 'none' : 'block';
        return (
            <div className="char__list">
                {loaded}
                {errorMessage}
                {charsLoad}
                <button className="button button__main button__long"
                        disabled={loadingNewItem}
                        style={{'display': charEndedStyle}}
                        onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;