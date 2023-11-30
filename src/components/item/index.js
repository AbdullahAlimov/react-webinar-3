import React, { useState } from "react";
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
        {props.itemActions}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    itemActions:PropTypes.node,
  }).isRequired,
};

export default React.memo(Item);
