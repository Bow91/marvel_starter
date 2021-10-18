import { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';


class App extends Component {
    state = {
        idSelectedChar: null
    }

    onSelectChar = (id) => {
        this.setState({
            idSelectedChar: id
        })
    }
    
    render() {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList onSelectChar={this.onSelectChar} />
                        <CharInfo idSelectedChar={this.state.idSelectedChar} />
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;