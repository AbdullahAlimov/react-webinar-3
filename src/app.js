import React from 'react';
import Router from './components/router';
import Basket from './components/basket';
import useSelector from './store/use-selector';

const App = () => {
    const activeModal = useSelector(state => state.modals.name);

    return (
        <div>
            <Router/>
            {activeModal === 'basket' && <Basket/>}
        </div>
    );
};

export default App;