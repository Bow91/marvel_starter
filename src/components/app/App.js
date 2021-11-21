import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary"

import decoration from '../../resources/img/vision.png';


const App = () => {

    const [idSelectedChar, setChar] = useState(null);

    const onSelectChar = (id) => {
        setChar(id);
    }
    
    return (
        <div className="app">
            <AppHeader/>
            <main>
                <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onSelectChar={onSelectChar} />
                    </ErrorBoundary>                        
                    <ErrorBoundary>
                        <CharInfo idSelectedChar={idSelectedChar} />
                    </ErrorBoundary>                        
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}

export default App;