import React, { memo } from 'react';
import PropTypes from 'prop-types';
import "./style.css"
import dateFormat from '../../utils/date-format';

function Comment({ name, lang,t, index,isCommentThisProfile, date, content, id, onChangeParent }) {
    return (
        <div className='Comment'>
            <p className={`Comment-name ${isCommentThisProfile && "thisProfile"}`}>{name}</p>
            <p className='Comment-date'>{dateFormat(new Date(date),lang)}</p>
            <p className='Comment-text'>{content}</p>
            <button className='Comment-button' onClick={() => {onChangeParent(id,index)}}>{t("comment.answer")}</button>
        </div>
    );
};

Comment.propTypes = {
    name: PropTypes.string,
    isCommentThisProfile:PropTypes.bool,
    date: PropTypes.string,
    content: PropTypes.string,
    id: PropTypes.string,
    onChangeParent: PropTypes.func
}

Comment.defaultProps = {
    onChangeParent: () => { }
}


export default memo(Comment);