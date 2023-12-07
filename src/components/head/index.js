import {memo} from "react";
import PropTypes from "prop-types";
import ChangeLocale from "../change-locale";
import './style.css';

function Head({title}) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <ChangeLocale/>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
