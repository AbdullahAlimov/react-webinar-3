import React,{memo} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import "style.css"

function AutorizationBlock({isAuthorized, onExit, userName}){
    return (
        <div className='EntranceBlock'>
            {isAuthorized?
            <>
            <Link to="/profile" className='EntranceBlock-link'>{userName}</Link>
            <button onClick={onExit}>Выход</button>
            </>
            :
            <Link to="/login"><button>Вход</button></Link>}
        </div>
    );
};

AutorizationBlock.propTypes = {
    isAuthorized:PropTypes.bool,
    userName:PropTypes.string,
    onExit:PropTypes.func
}

AutorizationBlock.defaultProps={
    onExit:()=>{}
}


export default memo(AutorizationBlock);