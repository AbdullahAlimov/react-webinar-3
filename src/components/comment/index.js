import React from 'react';
import "./style.css"

function Comment({name,date,content}){
    return (
        <div className='Comment'>
           <p className='Comment-name'>{name}</p>
           <p className='Comment-date'>{date}</p>
           <p className='Comment-content'>{content}</p>
           <button className='Comment-button'>Ответить</button>
        </div>
    );
};

export default Comment;