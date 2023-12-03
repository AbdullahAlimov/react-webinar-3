import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props) {
  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-actions'>
        <p className="Item-price">{props.item.price.toLocaleString()} ₽</p>
        <button className="Item-button" onClick={(e) => props.onClick(props.item.code, e)}>
          Добавить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    price: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func
};

Item.defaultProps = {
  onClick:()=>{},
}


export default React.memo(Item);
