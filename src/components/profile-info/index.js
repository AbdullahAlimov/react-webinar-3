import React,{memo} from 'react';
import PropTypes from "prop-types";
import "./style.css"

function ProfileInfo({userName,userTel,userEmail,labels}){
    return (
        <div className='ProfileInfo'>
            <p className='ProfileInfo-title'>{labels.profile}</p>
            <div className='ProfileInfo-info'>
                <p>{labels.name}: <span>{userName}</span></p>
                <p>{labels.phone}: <span>{userTel}</span></p>
                <p>{labels.email}: <span>{userEmail}</span></p>
            </div>
        </div>
    );
};

ProfileInfo.propTypes = {
    userName:PropTypes.string,
    userTel:PropTypes.string,
    userEmail:PropTypes.string,
    labels:PropTypes.object
};

export default memo(ProfileInfo);