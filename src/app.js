import React from 'react';
import {Header} from '@src/header';

const App = () => {
    const name = 'world';
    const str = `hello ${name}`;

    return (
        <>
            <Header/>
            {str}
        </>
    )
};

export default App;