import React,{memo} from 'react';
import "./style.css"
import PropTypes from "prop-types";
import { LOCALES } from '../../i18n/locales';

function ChangeLocale({onClick, locale}) {
    return (
        <div className='ChangeLocale'>
            <button className={`ChangeLocale-ru ${locale === LOCALES.RUSSIAN && "active"}`} onClick={() => onClick(LOCALES.RUSSIAN)}>RU</button>
            <button className={`ChangeLocale-en ${locale === LOCALES.ENGLISH && "active"}`} onClick={() => onClick(LOCALES.ENGLISH)}>EN</button>
        </div>
    );
};

ChangeLocale.propTypes = {
    locale: PropTypes.string,
    onClick: PropTypes.func
};
ChangeLocale.defaultProps = {
    onClick: () => { }
}

export default memo(ChangeLocale);