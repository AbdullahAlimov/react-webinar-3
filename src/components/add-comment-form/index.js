import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import "./style.css"

const AddCommentForm = ({ exists,onSignIn,onAdd}) => {
    
    const [value,setValue]=useState("")
    return (
        <div className='AddCommentForm'>{
            exists ?
                <>
                    <p className='AddCommentForm-title'>Новый комментрий</p>
                    <textarea className='AddCommentForm-input' placeholder="Введите комментарий" value={value} onChange={(e)=>{setValue(e.target.value)}}></textarea>
                    <button className='AddCommentForm-button' onClick={()=>onAdd(value)}>Отправить</button>
                </>
                :
                <p>
                    <a className='AddCommentForm-link' onClick={()=>onSignIn()}>Войдите</a>, чтобы иметь возможность комментировать
                </p>
        }
        </div>
    );
};

AddCommentForm.propTypes={
    exists: PropTypes.bool,
    onSignIn: PropTypes.func,
    onAdd:PropTypes.func,
}

AddCommentForm.defaultProps={
    onSignIn:()=>{},
    onAdd:()=>{},
}

export default memo(AddCommentForm);