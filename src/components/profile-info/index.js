import React,{memo} from 'react';
import PropTypes from "prop-types";
import "./style.css"

function ProfileInfo({userName,userTel,userEmail}){
    return (
        <div className='ProfileInfo'>
            <p className='ProfileInfo-title'>Профиль</p>
            <div className='ProfileInfo-info'>
                <p>Имя: <span>{userName}</span></p>
                <p>Телефон: <span>{userTel}</span></p>
                <p>email: <span>{userEmail}</span></p>
            </div>
        </div>
    );
};

ProfileInfo.propTypes = {
    userName:PropTypes.string,
    userTel:PropTypes.string,
    userEmail:PropTypes.string,
};

export default memo(ProfileInfo);