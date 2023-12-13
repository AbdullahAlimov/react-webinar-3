import {memo} from 'react'
import "./style.css"

function LoginForm(){
    return(
        <form className="LoginForm">
            <p className="LoginForm-title">Вход</p>
            <div className="LoginForm-input">
                <p>Логин</p>
                <input></input>
            </div>
            <div className="LoginForm-input">
                <p>Пароль</p>
                <input type='password'></input>
            </div>
            <button className="LoginForm-submit">Войти</button>
        </form>
    )
}

export default memo(LoginForm)