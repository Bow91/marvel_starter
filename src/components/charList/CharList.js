import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spiner/Spinner';

import './charList.scss';

class CharList extends Component {
    state = {
        chars: {},
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.loadListChars();
    }

    onLoadChars = (chars) => {
        this.setState({
            chars,
            loading: false
        });
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }
    
    loadListChars = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onLoadChars)
            .catch(this.onError)
    }

    ItemChar = (chars) => {
        const elements = chars.map(item => {
            const {name, thumbnail, id} = item,
                  imgStyle = thumbnail.includes('image_not_available') ? "fill" : "cover";
            return (
                <li className="char__item" key = {id} onClick={() => this.props.onSelectChar(id)}>
                    <img src={thumbnail} alt="abyss" style={{objectFit: imgStyle}}/>
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
        const {chars, loading, error} = this.state,
              loaded = loading ? <Spinner /> : null,
              errorMessage = error ? <ErrorMessage /> : null,
              charsLoad = !(loading || error) ? this.ItemChar(chars) : null;

        return (
            <div className="char__list">
                {loaded}
                {errorMessage}
                {charsLoad}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;