import React from "react";
import PropTypes from "prop-types";
import './style.css';

function CartItem(props) {

    return (
        <div className='Item'>
            <div className='Item-code'>{props.item.code}</div>
            <div className='Item-title'>
                {props.item.title}
            </div>
            <div className='Item-actions'>
                <p className="CartItem-price">{props.item.price.toLocaleString()} ₽</p>
                <p className="CartItem-quantity">{props.cart.filter((currentItem) => currentItem.code === props.item.code).length} шт</p>
                <button className="Item-button" onClick={(e) => props.onClick(props.item.code, e)}>
                    Удалить
                </button>
            </div>
        </div>
    );
}

CartItem.propTypes = {
    item: PropTypes.shape({
        code: PropTypes.number,
        title: PropTypes.string,
        price: PropTypes.number,
    }).isRequired,
    cart: PropTypes.array,
    onClick: PropTypes.func
};

CartItem.defaultProps = {
    onClick:()=>{},
}

export default React.memo(CartItem);
