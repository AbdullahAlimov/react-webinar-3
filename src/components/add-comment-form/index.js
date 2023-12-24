import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import "./style.css"

const AddCommentForm = ({ exists,onSignIn,onAdd,t}) => {
    
    const [value,setValue]=useState("")
    const [warning,setWarning]=useState("")

    const callbacks={
        onChange:(e)=>{
            setValue(e.target.value)
            setWarning("")
        },
        onSubmit:()=>{
            value.replace(/\s/g,"") ?
            onAdd(value):
            setWarning(t("commentsForm.emptyWarning"))
        }
    }
    return (
        <div className='AddCommentForm'>{
            exists ?
                <>
                    <p className='AddCommentForm-title'>{t("addForm.title")}</p>
                    <textarea className='AddCommentForm-input' placeholder={t("addForm.placeholder")} value={value} onChange={(e)=>callbacks.onChange(e)}></textarea>
                    {warning &&
                        <p className='AddCommentForm-warning'>{warning}</p>
                    }
                    <button className='AddCommentForm-button' onClick={callbacks.onSubmit}>{t("commentsForm.send")}</button>
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