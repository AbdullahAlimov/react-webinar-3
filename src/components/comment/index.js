import React, { memo } from 'react';
import PropTypes from 'prop-types';
import "./style.css"

function Comment({ name, lang,t, index, date, content, id, onChangeParent }) {
    const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    };

    const formattedDate = new Date(date).toLocaleDateString(lang, dateOptions);
    const year = new Date(date).getFullYear();

    const finalFormattedDate = formattedDate.replace(` ${year} г.`, ` ${year}`);

    return (
        <div className='Comment'>
            <p className='Comment-name'>{name}</p>
            <p className='Comment-date'>{finalFormattedDate}</p>
            <p className='Comment-text'>{content}</p>
            <button className='Comment-button' onClick={() => {onChangeParent(id,index)}}>{t("comment.answer")}</button>
        </div>
    );
};

Comment.propTypes = {
    name: PropTypes.string,
    date: PropTypes.string,
    content: PropTypes.string,
    id: PropTypes.string,
    onChangeParent: PropTypes.func
}

Comment.defaultProps = {
    onChangeParent: () => { }
}


export default memo(Comment);