import {memo} from 'react'
import PropTypes from "prop-types";

import "./style.css"

function LoginForm({errorMessage,login,password,onSubmit,onChange,labels}){
    return(
        <form className="LoginForm">
            <p className="LoginForm-title">{labels.enter}</p>
            <div className="LoginForm-input">
                <p>{labels.login}</p>
                <input onChange={e=>onChange({login:e.target.value,password:password})}></input>
            </div>
            <div className="LoginForm-input">
                <p>{labels.password}</p>
                <input type='password' onChange={e=>onChange({login:login,password:e.target.value})}></input>
            </div>
            <div className='LoginForm-error'>
                {errorMessage}
            </div>
            <button className="LoginForm-submit" type='button' onClick={()=>{onSubmit(login,password)}}>{labels.buttonEnter}</button>
        </form>
    )
}

LoginForm.PropTypes={
    errorMessage:PropTypes.string,
    login:PropTypes.string,
    password:PropTypes.string,
    onSubmit:PropTypes.func,
    onChange:PropTypes.func,
    labels:PropTypes.object
}
LoginForm.defaultProps={
    onSubmit:()=>{},
    onChange:()=>{},
}

export default memo(LoginForm)