import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from "../../utils";
import './style.css';
import { Link } from "react-router-dom";
import LocalizedText from "../../i18n/components/localized-text";
import { messages } from "../../i18n/messages";

function BasketTool({locale, sum, amount, onOpen }) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <Link to={"/"}>
        <LocalizedText className={cn('link')} id='main_page'></LocalizedText>
      </Link>
      <div className={cn('content')}>
        <LocalizedText className={cn('label')} id="in_basket">:</LocalizedText>
        <LocalizedText className={cn('total')}>
          {amount?
          `${amount} ${plural(amount, locale==="ru-RU"?{
            one: messages[locale]["one_product"],
            few: messages[locale]["few_product"],
            many: messages[locale]["many_product"]
          }:
          {
            one: messages[locale]["one_product"],
            other: messages[locale]["other_product"],
          },locale)} / ${numberFormat(sum)} ₽`:
          messages[locale]["empty"]
        }
        </LocalizedText>
        <button onClick={onOpen}><LocalizedText id="go_over"></LocalizedText></button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => { },
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
