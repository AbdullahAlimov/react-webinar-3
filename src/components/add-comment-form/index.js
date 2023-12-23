import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import "./style.css"

const AddCommentForm = ({ exists,onSignIn,onAdd,t}) => {
    
    const [value,setValue]=useState("")
    return (
        <div className='AddCommentForm'>{
            exists ?
                <>
                    <p className='AddCommentForm-title'>{t("addForm.title")}</p>
                    <textarea className='AddCommentForm-input' placeholder={t("addForm.placeholder")} value={value} onChange={(e)=>{setValue(e.target.value)}}></textarea>
                    <button className='AddCommentForm-button' onClick={()=>onAdd(value)}>{t("commentsForm.send")}</button>
                </>
                :
                <p>
                    <a className='AddCommentForm-link' onClick={()=>onSignIn()}>{t("commentsForm.logIn")}</a>, {t("addForm.warning")}
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