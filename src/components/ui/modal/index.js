import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Modal({ modalValue, setModalValue, children, title}) {
    return (
        <div className={'Modal' + (modalValue?" active":"")}>
            <div className={"Modal-container"}>
                <div className="Modal-controls">
                    <h1>{title}</h1>
                    <button className="Modal-close" onClick={()=>setModalValue(false)}>
                        Закрыть
                    </button>
                </div>
                <div className="Modal-content">
                    {children}
                </div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    modalValue: PropTypes.bool.isRequired,
    setModalValue: PropTypes.func.isRequired,
    children: PropTypes.node,
    title: PropTypes.string
};

export default React.memo(Modal);