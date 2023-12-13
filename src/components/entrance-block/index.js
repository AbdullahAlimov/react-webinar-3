import React,{memo} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import "style.css"

function EntranceBlock({isAuthorized, userName}){
    return (
        <div className='EntranceBlock'>
            {isAuthorized?
            <>
            <Link to="/profile" className='EntranceBlock-link'>{userName}</Link>
            <button>Выход</button>
            </>
            :
            <Link to="/login"><button>Вход</button></Link>}
        </div>
    );
};

EntranceBlock.propTypes = {
    isAuthorized:PropTypes.bool.isRequired,
    userName:PropTypes.string
};


export default memo(EntranceBlock);