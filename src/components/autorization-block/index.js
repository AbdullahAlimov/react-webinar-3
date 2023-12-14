import React,{memo} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import "style.css"

function AutorizationBlock({isAuthorized, onExit, userName, labels}){
    return (
        <div className='EntranceBlock'>
            {isAuthorized?
            <>
            <Link to="/profile" className='EntranceBlock-link'>{userName}</Link>
            <button onClick={onExit}>{labels.exit}</button>
            </>
            :
            <Link to="/login"><button>{labels.enter}</button></Link>}
        </div>
    );
};

AutorizationBlock.propTypes = {
    isAuthorized:PropTypes.bool,
    userName:PropTypes.string,
    onExit:PropTypes.func,
    labels:PropTypes.object,
}

AutorizationBlock.defaultProps={
    onExit:()=>{}
}


export default memo(AutorizationBlock);