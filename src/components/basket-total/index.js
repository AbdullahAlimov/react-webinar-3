import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import LocalizedText from "../localized-text";

function BasketTotal({sum}) {
  const cn = bem('BasketTotal');
  return (
    <div className={cn()}>
      <p className={cn('cell')}><LocalizedText id="total"/></p>
      <p className={cn('cell')}> {numberFormat(sum)} ₽</p>
      <p className={cn('cell')}></p>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number
};

BasketTotal.defaultProps = {
  sum: 0
}

export default memo(BasketTotal);
