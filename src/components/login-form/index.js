import {memo} from 'react'
import "./style.css"

function LoginForm({errorMessage,login,password,onSubmit,onChange}){
    return(
        <form className="LoginForm">
            <p className="LoginForm-title">Вход</p>
            <div className="LoginForm-input">
                <p>Логин</p>
                <input onChange={e=>onChange({login:e.target.value,password:password})}></input>
            </div>
            <div className="LoginForm-input">
                <p>Пароль</p>
                <input type='password' onChange={e=>onChange({login:login,password:e.target.value})}></input>
            </div>
            <div className='LoginForm-error'>
                {errorMessage}
            </div>
            <button className="LoginForm-submit" type='button' onClick={()=>{onSubmit(login,password)}}>Войти</button>
        </form>
    )
}

export default memo(LoginForm)