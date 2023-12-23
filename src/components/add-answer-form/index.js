import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import "./style.css"

const AddAnswerForm = ({ exists,onSignIn,onCancel,onAdd,t }) => {

    const [value,setValue]=useState("")

    return (
        <div className='AddAnswerForm'>{
            exists ?
                <div className='AddAnswerForm-content'>
                    <p className='AddAnswerForm-title'>{t("answerForm.title")}</p>
                    <textarea className='AddAnswerForm-input' placeholder={t("answerForm.placeholder")} value={value} onChange={(e)=>{setValue(e.target.value)}}></textarea>
                    <button className='AddCommentForm-button' onClick={()=>onAdd(value)}>{t("commentsForm.send")}</button>
                    <button className='AddCommentForm-button' onClick={()=>onCancel()}>{t("answerForm.cancel")}</button>
                </div>
                :
                <p>
                    <a className='AddAnswerForm-link' onClick={()=>onSignIn()}>{t("commentsForm.logIn")}</a>
                    , {t("answerForm.warning")}
                    <a className='AddAnswerForm-cancel' onClick={()=>onCancel()}>{t("answerForm.cancel")}</a>
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