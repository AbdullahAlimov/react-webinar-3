import React, { useCallback } from 'react';
import "./style.css"
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';

function ChangeLocale(){
    const store=useStore()
    const locale=useSelector(state=>state.language.locale)

    const callbacks={
        onClick:useCallback((newLocale)=>{
            if(newLocale!==locale){
                store.actions.language.setState({
                    locale:newLocale
                },`Локализация сменена на ${newLocale}`)
            }
        },[locale])
    }
    return (
        <div className='ChangeLocale'>
            <button className={`ChangeLocale-ru ${locale==="ru-RU" && "active"}`} onClick={()=>callbacks.onClick("ru-RU")}>RU</button>
            <button className={`ChangeLocale-en ${locale==="en-US" && "active"}`} onClick={()=>callbacks.onClick("en-US")}>EN</button>
        </div>
    );
};

export default ChangeLocale;