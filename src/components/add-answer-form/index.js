import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import "./style.css"

const AddAnswerForm = ({ exists,onSignIn,onCancel,onAdd }) => {

    const [value,setValue]=useState("")

    return (
        <div className='AddAnswerForm'>{
            exists ?
                <div className='AddAnswerForm-content'>
                    <p className='AddAnswerForm-title'>Новый ответ</p>
                    <textarea className='AddAnswerForm-input' placeholder="Введите ответ" value={value} onChange={(e)=>{setValue(e.target.value)}}></textarea>
                    <button className='AddCommentForm-button' onClick={()=>onAdd(value)}>Отправить</button>
                    <button className='AddCommentForm-button' onClick={()=>onCancel()}>Отмена</button>
                </div>
                :
                <p>
                    <a className='AddAnswerForm-link' onClick={()=>onSignIn()}>Войдите</a>
                    ,чтобы иметь возможность ответить. 
                    <a className='AddAnswerForm-cancel' onClick={()=>onCancel()}>Отмена</a>
                </p>
        }
        </div>
    );
};

AddAnswerForm.propTypes={
    exists:PropTypes.bool,
    onSignIn:PropTypes.func,
    onCancel:PropTypes.func,
    onAdd:PropTypes.func,
}

AddAnswerForm.defaultProps={
    onSignIn:()=>{},
    onCancel:()=>{},
    onAdd:()=>{},
}

export default memo(AddAnswerForm);