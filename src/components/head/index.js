import {memo} from "react";
import PropTypes from "prop-types";
import ChangeLocale from "../change-locale";
import './style.css';

function Head({title,locale,changeLocale}) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <ChangeLocale locale={locale} onClick={changeLocale} />
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  locale: PropTypes.string,
  changeLocale: PropTypes.func
};
Head.defaultProps={
  changeLocale:()=>{}
}

export default memo(Head);
